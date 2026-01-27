import { useState } from "react";
import { Card, Badge, Button, Form } from "react-bootstrap";
import DeletePcSettingModal from "./DeletePcSettingModal";
import PencilIcon from "../assets/icons/pencil.png";
import BinIcon from "../assets/icons/bin.png";
import CheckIcon from "../assets/icons/check.png";
import { useSettingDetail } from "../hooks/useSettingDetail";
import {
  companyLabels,
  onboardingTypeLabels,
  roleLabels,
  deviceTypeLabels,
  networkTypeLabels,
  onboardingTypeBadges,
} from "../constants/labels";

type ChecklistItem = {
  text: string;
  checked: boolean;
};

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

interface PcDetailPanelProps {
  settingId: string;
  onClose: () => void;
}

const PcDetailPanel = ({ settingId, onClose }: PcDetailPanelProps) => {
  const { setting, loading } = useSettingDetail(settingId);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isMemoEditMode, setIsMemoEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [input, setInput] = useState("");
  const [form, setForm] = useState({
    urgency: setting?.urgency ? "true" : "false",
    status: setting?.status,
    company: setting?.company,
    role: setting?.role,
    collaborators: setting?.collaborators,
    assignee_name: setting?.assignee_name,
    onboarding_type: setting?.onboarding_type,
    requested_date: setting?.requested_date,
    due_date: setting?.due_date,
    memo: setting?.memo,
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

  const addChecklist = () => {
    if (!input.trim()) return;
    setChecklist([...checklist, { text: input, checked: false }]);
    setInput("");
  };

  const toggleCheck = (index: number) => {
    setChecklist((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const removeChecklist = (index: number) => {
    setChecklist((prev) => prev.filter((_, i) => i !== index));
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
              value={form.onboarding_type}
              onChange={handleChange}
              style={{ width: 120 }}
            >
              <option value="pending">미정</option>
              <option value="new">신규입사</option>
              <option value="replace">교채</option>
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
            <button
              className="btn p-0 border-0 bg-transparent me-2"
              onClick={() => setShowDeleteModal(true)}
            >
              <img src={BinIcon} alt="삭제" width={16} height={16} />
            </button>

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
                // TODO: 여기서 저장 API 호출
                setIsEditMode(false);
              }}
            />
          ) : (
            <img
              src={PencilIcon}
              width={14}
              height={14}
              style={{ cursor: "pointer" }}
              onClick={() => setIsEditMode(true)}
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
                value={form.status}
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
                  {item.text}
                </span>
              </label>
              <button onClick={() => removeChecklist(index)}>
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
                  // TODO: 여기서 저장 API 호출
                  setIsEditMode(false);
                }}
              />
            </button>
          ) : (
            <img
              src={PencilIcon}
              width={14}
              height={14}
              style={{ cursor: "pointer" }}
              onClick={() => setIsMemoEditMode(true)}
            />
          )}
        </div>

        <Form.Control
          as="textarea"
          rows={3}
          placeholder="메모를 입력하세요..."
          value={form.memo}
          onChange={handleChange}
          disabled={!isMemoEditMode}
          className="mb-4"
        />

        {/* ===== 상태 변경 ===== */}
        {!isEditMode && (
          <>
            <strong className="d-block mb-2">상태 변경</strong>
            <div className="status-grid">
              <Button
                variant={
                  setting.status == "pending" ? "dark" : "outline-secondary"
                }
              >
                출고 전
              </Button>
              <Button
                variant={
                  setting.status == "shipped" ? "dark" : "outline-secondary"
                }
              >
                출고 완료
              </Button>
              <Button
                variant={
                  setting.status == "setting" ? "dark" : "outline-secondary"
                }
              >
                진행중
              </Button>
              <Button
                variant={
                  setting.status == "completed" ? "dark" : "outline-secondary"
                }
              >
                완료
              </Button>
            </div>
          </>
        )}
      </Card.Body>
      <DeletePcSettingModal
        show={showDeleteModal}
        settingId={settingId}
        onClose={() => setShowDeleteModal(false)}
        onDeleted={() => {
          setShowDeleteModal(false);
        }}
      />
    </Card>
  );
};

export default PcDetailPanel;
