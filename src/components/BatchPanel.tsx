import { useState } from "react";
import { Card, Badge, Button, Form } from "react-bootstrap";
import { useBulkUpdateSetting } from "../hooks/useBulkUpdateSetting";

interface BatchPanelProps {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  handleClosePanel: () => void;
  onClose: () => void;
}

const PcDetailPanel = ({
  selectedIds,
  setSelectedIds,
  handleClosePanel,
  onClose,
}: BatchPanelProps) => {
  const { bulkUpdate, loading } = useBulkUpdateSetting();
  const [form, setForm] = useState({
    onboarding_type: "",
    status: "",
    urgency: "",
    assignee_name: "",
    due_date: "",
  });

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
      const data = Object.entries(form).reduce(
        (acc, [key, value]) => {
          if (value !== "") {
            acc[key] = key === "urgency" ? value === "true" : value;
          }
          return acc;
        },
        {} as Record<string, boolean | string>,
      );

      await bulkUpdate({
        updates: selectedIds.map((id) => ({
          id,
          data,
        })),
      });
    } catch (e) {
      console.error(e);
      alert("세팅 수정에 실패했어요");
    }
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Badge bg="primary">미정</Badge>

          <button className="btn p-0 border-0 bg-transparent" onClick={onClose}>
            ✕
          </button>
        </div>
        <h5 className="fw-bold mb-1">일괄 작업</h5>
        <div className="text-muted mb-3">
          선택한 항목에 대해 일괄 작업을 수행해요
        </div>
        <hr />
        {/* ===== 빠른 작업 ===== */}
        <strong className="d-block mb-2">빠른 작업</strong>
        <div className="text-muted mb-3">
          이미 완료된 항목은 실행되지 않아요 <br></br>
          재실행이 필요한 경우, 단일 빠른 작업에서 실행해주세요
        </div>
        <Card className="mb-3">
          <Card.Body className="d-flex align-items-center gap-3">
            <div>🔐</div>

            <div className="flex-grow-1">
              <div className="fw-semibold">Okta Setting 그룹 할당</div>
              <div className="text-muted small">
                비밀번호 초기화 및 Setting 그룹 추가
              </div>
            </div>

            <Button variant="outline-secondary" size="sm">
              실행
            </Button>
          </Card.Body>
        </Card>
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
          <Button variant="dark" onClick={handleSubmit} disabled={loading}>
            저장 ({selectedIds.length})
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
      </Card.Body>
    </Card>
  );
};

export default PcDetailPanel;
