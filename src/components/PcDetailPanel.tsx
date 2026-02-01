import { useState, useEffect, useRef } from "react";
import { Card, Badge, Button, Form } from "react-bootstrap";
import DeletePcSettingModal from "./DeletePcSettingModal";
import PencilIcon from "../assets/icons/pencil.png";
import BinIcon from "../assets/icons/bin.png";
import CheckIcon from "../assets/icons/check.png";
import type { ChecklistItem } from "../api/setting";
import { useSettingList } from "../hooks/useSettingList";
import { useSettingDetail } from "../hooks/useSettingDetail";
import { useQuickAction } from "../hooks/useQuickAction";
import { useBulkUpdateSetting } from "../hooks/useBulkUpdateSetting";
import {
  companyLabels,
  onboardingTypeLabels,
  roleLabels,
  deviceTypeLabels,
  networkTypeLabels,
} from "../constants/labels";
import { onboardingTypeBadges } from "../constants/badges";
import {
  actionTitleMap,
  actionDescMap,
  actionIcons,
  sortQuickActions,
} from "../constants/quickActions";

const InfoRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="d-flex justify-content-between align-items-center mb-2">
    <span className="text-muted">{label}</span>
    <div style={{ width: 180 }}>{children}</div>
  </div>
);

const quickActionCardStyle: Record<string, { bg: string }> = {
  done: {
    bg: "bg-success-subtle",
  },
  error: {
    bg: "bg-danger-subtle",
  },
  pending: {
    bg: "",
  },
  "n/a": {
    bg: "",
  },
  progress: {
    bg: "",
  },
};

interface PcDetailPanelProps {
  settingId: string;
  onClose: () => void;
  listRefetch: () => Promise<void>;
}

const PcDetailPanel = ({
  settingId,
  onClose,
  listRefetch,
}: PcDetailPanelProps) => {
  const { setting, loading, refetch } = useSettingDetail(settingId);
  const { bulkUpdate } = useBulkUpdateSetting();
  const { execute } = useQuickAction();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isMemoEditMode, setIsMemoEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    setting?.checklist ?? [],
  );
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!setting?.checklist) return;
    if (initializedRef.current) return;

    setChecklist(setting.checklist);
    initializedRef.current = true;
  }, [setting?.id]);

  const [input, setInput] = useState("");
  const [form, setForm] = useState({
    urgency: "false",
    status: "",
    company: "",
    role: "",
    collaborators: "",
    assignee_name: "",
    onboarding_type: "",
    requested_date: "",
    due_date: "",
    memo: "",
  });

  if (!setting) return null;
  const sortedActions = sortQuickActions(setting.quick_actions);
  const visibleActions = sortedActions.filter((qa) => qa.status !== "n/a");

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
        updates: [
          {
            id: settingId,
            data,
          },
        ],
      });
      await refetch();
      await listRefetch();
    } catch (e) {
      console.error(e);
      alert("세팅 수정에 실패했어요");
    }
  };

  const changeStatus = async (nextStatus: string) => {
    if (setting.status === nextStatus) return;

    try {
      await bulkUpdate({
        updates: [
          {
            id: settingId,
            data: { status: nextStatus },
          },
        ],
      });
      await refetch();
      await listRefetch();
    } catch (e) {
      console.error(e);
      alert("상태 변경에 실패했어요");
    }
  };

  const addChecklist = async () => {
    if (!input.trim()) return;

    const nextChecklist = [...checklist, { label: input, checked: false }];
    setChecklist(nextChecklist);

    try {
      await bulkUpdate({
        updates: [
          {
            id: settingId,
            data: { checklist: nextChecklist },
          },
        ],
      });
      await refetch();
    } catch (e) {
      console.error(e);
      alert("체크리스트 추가에 실패했어요");
    }

    setInput("");
  };

  const toggleCheck = async (index: number) => {
    const next = checklist.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item,
    );

    setChecklist(next);

    await bulkUpdate({
      updates: [{ id: settingId, data: { checklist: next } }],
    });
    await refetch();
  };

  const removeChecklist = async (index: number) => {
    const nextChecklist = checklist.filter((_, i) => i !== index);

    setChecklist(nextChecklist);

    try {
      await bulkUpdate({
        updates: [
          {
            id: settingId,
            data: { checklist: nextChecklist },
          },
        ],
      });
      await refetch();
    } catch (e) {
      console.error(e);
      alert("체크리스트 삭제에 실패했어요");
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (!setting) return null;

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          {isEditMode ? (
            <Form.Select
              size="sm"
              name="onboarding_type"
              value={form.onboarding_type}
              onChange={handleChange}
              style={{ width: 120 }}
            >
              <option value="pending">미정</option>
              <option value="new">신규입사</option>
              <option value="replace">교체</option>
              <option value="rejoin">복직</option>
              <option value="swich">전환</option>
            </Form.Select>
          ) : (
            <Badge bg={onboardingTypeBadges[setting.onboarding_type]}>
              {onboardingTypeLabels[setting.onboarding_type]}
            </Badge>
          )}

          {/* 오른쪽 아이콘 영역 */}
          <div className="d-flex align-items-center gap-2">
            {/* 삭제 (휴지통) */}
            {setting?.is_manual && (
              <button
                className="btn p-0 border-0 bg-transparent me-2"
                onClick={() => setShowDeleteModal(true)}
              >
                <img src={BinIcon} alt="삭제" width={16} height={16} />
              </button>
            )}

            {/* 닫기 */}
            <button
              className="btn p-0 border-0 bg-transparent"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>
        {/* ===== 이름 / 이메일 ===== */}
        <h5 className="fw-bold mb-1">{setting.user_name}</h5>
        <div className="text-muted mb-3">{setting.user_email}</div>
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>기본 정보</strong>

          {isEditMode ? (
            <img
              src={CheckIcon}
              width={16}
              height={16}
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSubmit();
                setIsEditMode(false);
              }}
            />
          ) : (
            <img
              src={PencilIcon}
              width={14}
              height={14}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setForm({
                  urgency: setting.urgency ? "true" : "false",
                  status: setting.status ?? "",
                  company: setting.company ?? "",
                  role: setting.role ?? "",
                  collaborators: setting.collaborators ?? "",
                  assignee_name: setting.assignee_name ?? "",
                  onboarding_type: setting.onboarding_type ?? "",
                  requested_date: setting.requested_date?.slice(0, 10) ?? "",
                  due_date: setting.due_date?.slice(0, 10) ?? "",
                  memo: setting.memo ?? "",
                });
                setIsEditMode(true);
              }}
            />
          )}
        </div>
        <div className="mb-3">
          <InfoRow label="OS">
            <span>{setting.os}</span>
          </InfoRow>

          <InfoRow label="장비 모델">
            <span>{setting.model}</span>
          </InfoRow>

          <InfoRow label="장비 종류">
            <span>
              {networkTypeLabels[setting.network_type]} -{" "}
              {deviceTypeLabels[setting.device_type]}
            </span>
          </InfoRow>

          <InfoRow label="시리얼 넘버">
            <span>{setting.serial}</span>
          </InfoRow>

          <InfoRow label="계열사">
            {isEditMode ? (
              <Form.Select
                size="sm"
                name="company"
                value={form.company}
                onChange={handleChange}
              >
                <option value="core">코어</option>
                <option value="bank">뱅크</option>
                <option value="insu">인슈</option>
              </Form.Select>
            ) : (
              <span>{companyLabels[setting.company]}</span>
            )}
          </InfoRow>

          <InfoRow label="구분">
            {isEditMode ? (
              <Form.Select
                size="sm"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="team">팀원</option>
                <option value="asst">어시</option>
              </Form.Select>
            ) : (
              <span>{roleLabels[setting.role]}</span>
            )}
          </InfoRow>

          <InfoRow label="협업 팀원">
            {isEditMode ? (
              <Form.Control
                size="sm"
                name="collaborators"
                value={form.collaborators}
                onChange={handleChange}
              />
            ) : (
              <span>{setting.collaborators || "-"}</span>
            )}
          </InfoRow>

          <InfoRow label="긴급도">
            {isEditMode ? (
              <Form.Select
                size="sm"
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
              >
                <option value="false">일반</option>
                <option value="true">급건</option>
              </Form.Select>
            ) : (
              <span>{form.urgency == "false" ? "일반" : "급건"}</span>
            )}
          </InfoRow>

          <InfoRow label="담당자">
            {isEditMode ? (
              <Form.Control
                size="sm"
                name="assignee_name"
                value={form.assignee_name}
                onChange={handleChange}
              />
            ) : (
              <span>{setting.assignee_name || "-"}</span>
            )}
          </InfoRow>

          <InfoRow label="요청일">
            {isEditMode ? (
              <Form.Control
                size="sm"
                name="requested_date"
                type="date"
                value={form.requested_date}
                onChange={handleChange}
              />
            ) : (
              <span>
                {new Date(setting.requested_date).toLocaleDateString("ko-KR")}
              </span>
            )}
          </InfoRow>

          <InfoRow label="마감일">
            {isEditMode ? (
              <Form.Control
                size="sm"
                name="due_date"
                type="date"
                value={form.due_date}
                onChange={handleChange}
              />
            ) : (
              <span>
                {setting.due_date
                  ? new Date(setting.due_date).toLocaleDateString("ko-KR")
                  : "-"}
              </span>
            )}
          </InfoRow>
        </div>
        {/* ===== 빠른 작업 ===== */}
        <strong className="d-block mb-2">빠른 작업</strong>
        {setting.onboarding_type === "pending" ||
        visibleActions.length === 0 ? (
          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-center align-items-center text-center">
              <div className="text-muted small">
                실행 가능한 빠른 작업이 없어요
              </div>
            </Card.Body>
          </Card>
        ) : (
          sortedActions.map((qa) => (
            <Card
              key={qa.action}
              className={`mb-3 ${quickActionCardStyle[qa.status]?.bg ?? ""} `}
            >
              <Card.Body className="d-flex align-items-center gap-3">
                <img
                  src={actionIcons[qa.action]}
                  alt={qa.action}
                  width={24}
                  height={24}
                />

                <div className="flex-grow-1">
                  <div className="fw-semibold">{actionTitleMap[qa.action]}</div>
                  <div className="text-muted small">
                    {actionDescMap[qa.action]}
                  </div>
                  {(qa.status === "error" || qa.status === "done") && (
                    <div className="text-muted small">
                      최근 실행:{" "}
                      {qa.requested_at
                        ? new Date(qa.requested_at + "Z").toLocaleTimeString(
                            "ko-KR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              timeZone: "Asia/Seoul",
                            },
                          )
                        : "-"}{" "}
                      | 실행자: {qa.requested_by}
                    </div>
                  )}
                </div>

                <Button
                  variant={
                    qa.status === "done"
                      ? "outline-success"
                      : qa.status === "error"
                        ? "outline-danger"
                        : "outline-primary"
                  }
                  size="sm"
                  disabled={qa.status === "progress"}
                  onClick={() =>
                    execute({
                      action: qa.action,
                      settingIds: [setting.id],
                      requestedBy: "이유민B",
                    })
                  }
                >
                  {qa.status === "pending"
                    ? "실행"
                    : qa.status === "progress"
                      ? "실행중"
                      : "재실행"}
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
        {/* ===== 세팅 체크리스트 ===== */}
        <strong className="d-block mb-2">세팅 체크리스트</strong>
        <div className="d-flex gap-2 mb-3">
          <Form.Control
            placeholder="새로운 체크리스트 항목 추가..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={addChecklist}
            className="checklist-add-btn"
            style={{ flexShrink: 0 }}
          >
            추가
          </Button>
        </div>
        <ul className="checklist-list">
          {checklist.map((item, index) => (
            <li key={index} className="checklist-item">
              <label className="checklist-left">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(index)}
                />
                <span className={item.checked ? "checked" : ""}>
                  {item.label}
                </span>
              </label>
              <button
                className="btn p-0 border-0 bg-transparent me-2"
                onClick={() => removeChecklist(index)}
              >
                <img src={BinIcon} alt="삭제" width={15} height={15} />
              </button>
            </li>
          ))}
        </ul>
        <hr />
        {/* ===== 메모 ===== */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>메모</strong>

          {isMemoEditMode ? (
            <button
              className="btn p-0 border-0 bg-transparent"
              onClick={() => setIsMemoEditMode(false)}
            >
              <img
                src={CheckIcon}
                width={16}
                height={16}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleSubmit();
                  setIsMemoEditMode(false);
                }}
              />
            </button>
          ) : (
            <img
              src={PencilIcon}
              width={14}
              height={14}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setForm({
                  urgency: setting.urgency ? "true" : "false",
                  status: setting.status ?? "",
                  company: setting.company ?? "",
                  role: setting.role ?? "",
                  collaborators: setting.collaborators ?? "",
                  assignee_name: setting.assignee_name ?? "",
                  onboarding_type: setting.onboarding_type ?? "",
                  requested_date: setting.requested_date?.slice(0, 10) ?? "",
                  due_date: setting.due_date?.slice(0, 10) ?? "",
                  memo: setting.memo ?? "",
                });
                setIsMemoEditMode(true);
              }}
            />
          )}
        </div>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder={setting.memo}
          value={setting.memo}
          name="memo"
          onChange={handleChange}
          disabled={!isMemoEditMode}
          className="mb-4"
        />

        {/* ===== 상태 변경 ===== */}
        <strong className="d-block mb-2">상태 변경</strong>
        <div className="status-grid">
          <Button
            onClick={() => changeStatus("pending")}
            variant={setting.status == "pending" ? "dark" : "outline-secondary"}
          >
            출고 전
          </Button>
          <Button
            onClick={() => changeStatus("shipped")}
            variant={setting.status == "shipped" ? "dark" : "outline-secondary"}
          >
            출고 완료
          </Button>
          <Button
            onClick={() => changeStatus("setting")}
            variant={setting.status == "setting" ? "dark" : "outline-secondary"}
          >
            진행중
          </Button>
          <Button
            onClick={() => changeStatus("completed")}
            variant={
              setting.status == "completed" ? "dark" : "outline-secondary"
            }
          >
            완료
          </Button>
        </div>
      </Card.Body>
      <DeletePcSettingModal
        show={showDeleteModal}
        settingId={settingId}
        listRefetch={listRefetch}
        onClose={() => setShowDeleteModal(false)}
        onDeleted={() => {
          setShowDeleteModal(false);
        }}
      />
    </Card>
  );
};

export default PcDetailPanel;
