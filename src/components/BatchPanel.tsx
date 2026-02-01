import { useState } from "react";
import { Card, Badge, Button, Form } from "react-bootstrap";
import type { Setting } from "../api/setting";
import SelectedSettingsModal from "./SelectedSettingsModal";
import { useBulkUpdateSetting } from "../hooks/useBulkUpdateSetting";
import { useQuickAction } from "../hooks/useQuickAction";
import { getCommonQuickActions } from "../utils/quickActions";
import {
  actionIcons,
  actionDescMap,
  actionTitleMap,
  sortQuickActionNames,
} from "../constants/quickActions";
import { onboardingTypeLabels } from "../constants/labels";
import type { ToastController } from "../constants/toast";

interface BatchPanelProps {
  selectedSettings: Setting[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  listRefetch: () => Promise<void>;
  toast: ToastController;
  handleClosePanel: () => void;
  onClose: () => void;
}

const PcDetailPanel = ({
  selectedSettings,
  setSelectedIds,
  listRefetch,
  toast,
  handleClosePanel,
  onClose,
}: BatchPanelProps) => {
  const [showSelectedModal, setShowSelectedModal] = useState(false);
  const { execute, loadingAction } = useQuickAction();
  const { bulkUpdate } = useBulkUpdateSetting();
  const [form, setForm] = useState({
    onboarding_type: "",
    status: "",
    urgency: "",
    assignee_name: "",
    due_date: "",
  });

  const data = Object.entries(form).reduce(
    (acc, [key, value]) => {
      if (value !== "") {
        acc[key] = key === "urgency" ? value === "true" : value;
      }
      return acc;
    },
    {} as Record<string, boolean | string>,
  );

  const commonActions = sortQuickActionNames(
    getCommonQuickActions(selectedSettings),
  );

  const osSet = new Set(selectedSettings.map((s) => s.os));
  const typeSet = new Set(selectedSettings.map((s) => s.onboarding_type));

  const hasMixedOs = osSet.size > 1;
  const hasMixedType = typeSet.size > 1;
  const hasMixedCondition = hasMixedOs || hasMixedType;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await bulkUpdate({
        updates: selectedSettings.map((setting) => ({
          id: setting.id,
          data,
        })),
      });
      await listRefetch();
      toast.openToast("일괄 작업이 처리되었어요", "success");
    } catch {
      toast.openToast("상태 변경에 실패했어요", "error");
    }
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Badge bg="primary">선택 {selectedSettings.length}건</Badge>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm"
              onClick={() => setShowSelectedModal(true)}
              disabled={selectedSettings.length === 0}
            >
              선택 항목 보기
            </button>

            <button
              className="btn p-0 border-0 bg-transparent"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>
        <h5 className="fw-bold mb-1">일괄 작업</h5>
        <div className="text-muted mb-3">
          선택한 항목에 대해 일괄 작업을 수행해요
        </div>
        <hr />
        {/* ===== 빠른 작업 ===== */}
        <strong className="d-block mb-2">빠른 작업</strong>
        <div className="text-muted mb-3">
          이미 완료된 항목은 일괄 실행에서 제외돼요 <br></br>
          재실행이 필요한 경우, 단일 빠른 작업에서 실행해주세요
        </div>
        {hasMixedCondition && (
          <Card
            className="mb-3"
            style={{
              backgroundColor: "#fff5f5",
              border: "1px solid #f5c2c7",
            }}
          >
            <Card.Body className="small">
              <div className="fw-semibold mb-1 text-danger">
                선택된 세팅 조건이 서로 달라요
              </div>

              <div className="text-muted mb-2">
                일괄 작업에서는 <b>모든 세팅에 공통으로 가능한 빠른 작업만</b>{" "}
                표시돼요
              </div>

              <div className="d-flex flex-column gap-1">
                {hasMixedOs && (
                  <div>
                    <span className="fw-semibold">OS:</span>{" "}
                    {[...osSet].join(", ")}
                  </div>
                )}

                {hasMixedType && (
                  <div>
                    <span className="fw-semibold">유형:</span>{" "}
                    {[...typeSet]
                      .map((type) => onboardingTypeLabels[type])
                      .join(", ")}
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        )}
        {commonActions.length === 0 ? (
          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-center align-items-center text-center">
              <div className="text-muted small">
                실행 가능한 빠른 작업이 없어요
              </div>
            </Card.Body>
          </Card>
        ) : (
          commonActions.map((qaName) => (
            <Card key={qaName} className="mb-3">
              <Card.Body className="d-flex align-items-center gap-3">
                <img
                  src={actionIcons[qaName]}
                  alt={qaName}
                  width={24}
                  height={24}
                />

                <div className="flex-grow-1">
                  <div className="fw-semibold">{actionTitleMap[qaName]}</div>
                  <div className="text-muted small">
                    {actionDescMap[qaName]}
                  </div>
                </div>

                <Button
                  variant="outline-primary"
                  size="sm"
                  disabled={loadingAction != null}
                  onClick={() =>
                    execute({
                      action: qaName,
                      settingIds: selectedSettings
                        .filter((s) =>
                          s.quick_actions?.find(
                            (qa) =>
                              qa.action === qaName && qa.status === "pending",
                          ),
                        )
                        .map((s) => s.id),
                      requestedBy: "이유민B",
                    })
                  }
                >
                  실행
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
        <hr />
        <strong className="d-block mb-2">유형 변경</strong>
        <div className="text-muted mb-3">
          선택 항목의 세팅 유형을 한 번에 변경해요
        </div>
        <Form.Select
          value={form.onboarding_type}
          name="onboarding_type"
          onChange={handleChange}
          className="filter-select"
        >
          {/* placeholder 역할 */}
          <option value="">유형 선택</option>

          <option value="pending">미정</option>
          <option value="new">신규입사</option>
          <option value="replace">교체</option>
          <option value="rejoin">복직</option>
          <option value="switch">전환자</option>
        </Form.Select>
        <hr />
        <strong className="d-block mb-2">상태 변경</strong>
        <div className="text-muted mb-3">
          선택 항목의 진행 상태를 한 번에 변경해요
        </div>
        <Form.Select
          value={form.status}
          name="status"
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">상태 선택</option>

          <option value="pending">출고 전</option>
          <option value="shipped">출고 완료</option>
          <option value="setting">세팅 중</option>
          <option value="completed">완료</option>
        </Form.Select>
        <hr />
        <strong className="d-block mb-2">긴급도 변경</strong>
        <div className="text-muted mb-3">
          선택 항목의 긴급도를 한 번에 변경해요
        </div>
        <Form.Select
          value={form.urgency}
          name="urgency"
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">긴급도 선택</option>

          <option value="true">급건</option>
          <option value="false">일반</option>
        </Form.Select>
        <hr />
        <strong className="d-block mb-2">담당자 변경</strong>
        <div className="text-muted mb-3">
          선택 항목의 담당자를 한 번에 변경해요
        </div>
        <Form.Select
          value={form.assignee_name}
          name="assignee_name"
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">담당자 선택</option>

          <option value="김토스A">김토스A</option>
          <option value="이토스B">이토스B</option>
          <option value="박토스A">박토스A</option>
        </Form.Select>
        <hr />
        <strong className="d-block mb-2">마감일 변경</strong>
        <div className="text-muted mb-3">
          선택 항목의 마감일을 한 번에 변경해요
        </div>
        <Form.Control
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          className="filter-select"
        />{" "}
        <hr />
        <div className="status-grid">
          <Button
            variant="dark"
            onClick={handleSubmit}
            disabled={Object.keys(data).length === 0}
          >
            저장 ({selectedSettings.length})
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setSelectedIds([]);
              handleClosePanel();
            }}
          >
            선택 해제
          </Button>
        </div>
        <SelectedSettingsModal
          show={showSelectedModal}
          onClose={() => setShowSelectedModal(false)}
          selectedSettings={selectedSettings}
        />
      </Card.Body>
    </Card>
  );
};

export default PcDetailPanel;
