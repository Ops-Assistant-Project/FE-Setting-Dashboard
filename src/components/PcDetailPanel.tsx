import { useState } from "react";
import { Card, Badge, Button, Form } from "react-bootstrap";
import PencilIcon from "../assets/icons/pencil.png";
import BinIcon from "../assets/icons/bin.png";
import CheckIcon from "../assets/icons/check.png";

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

const PcDetailPanel = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [status, setStatus] = useState("미정");
  const [company, setCompany] = useState("코어");
  const [role, setRole] = useState("어시");
  const [collaborator, setCollaborator] = useState("");
  const [urgency, setUrgency] = useState("일반");
  const [manager, setManager] = useState("");
  const [requestDate, setRequestDate] = useState("2025-11-20");
  const [dueDate, setDueDate] = useState("");

  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [input, setInput] = useState("");

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

  return (
    <Card className="h-100">
      <Card.Body>
        {/* ===== 상단 상태 ===== */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          {isEditMode ? (
            <Form.Select
              size="sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: 120 }}
            >
              <option value="미정">미정</option>
              <option value="출고 전">출고 전</option>
              <option value="출고 완료">출고 완료</option>
              <option value="진행중">진행중</option>
              <option value="완료">완료</option>
            </Form.Select>
          ) : (
            <Badge bg="danger">{status}</Badge>
          )}

          <button className="btn p-0 border-0 bg-transparent">✕</button>
        </div>

        {/* ===== 이름 / 이메일 ===== */}
        <h5 className="fw-bold mb-1">이유민B</h5>
        <div className="text-muted mb-3">asst2508210@tosspartners.com</div>

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
            <span>Windows</span>
          </InfoRow>

          <InfoRow label="장비 모델">
            <span>16ML</span>
          </InfoRow>

          <InfoRow label="장비 종류">
            <span>인터넷망 - 인터넷 PC</span>
          </InfoRow>

          <InfoRow label="시리얼 넘버">
            <span>11199</span>
          </InfoRow>

          <InfoRow label="계열사">
            {isEditMode ? (
              <Form.Select
                size="sm"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                <option value="코어">코어</option>
                <option value="플랫폼">플랫폼</option>
              </Form.Select>
            ) : (
              <span>{company}</span>
            )}
          </InfoRow>

          <InfoRow label="구분">
            {isEditMode ? (
              <Form.Select
                size="sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="어시">어시</option>
                <option value="매니저">매니저</option>
              </Form.Select>
            ) : (
              <span>{role}</span>
            )}
          </InfoRow>

          <InfoRow label="협업 팀원">
            {isEditMode ? (
              <Form.Control
                size="sm"
                value={collaborator}
                onChange={(e) => setCollaborator(e.target.value)}
              />
            ) : (
              <span>{collaborator || "-"}</span>
            )}
          </InfoRow>

          <InfoRow label="긴급도">
            {isEditMode ? (
              <Form.Select
                size="sm"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option value="일반">일반</option>
                <option value="급건">급건</option>
              </Form.Select>
            ) : (
              <span>{urgency}</span>
            )}
          </InfoRow>

          <InfoRow label="담당자">
            {isEditMode ? (
              <Form.Control
                size="sm"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
              />
            ) : (
              <span>{manager || "-"}</span>
            )}
          </InfoRow>

          <InfoRow label="요청일">
            {isEditMode ? (
              <Form.Control
                size="sm"
                type="date"
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
              />
            ) : (
              <span>{requestDate}</span>
            )}
          </InfoRow>

          <InfoRow label="마감일">
            {isEditMode ? (
              <Form.Control
                size="sm"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            ) : (
              <span>{dueDate || "-"}</span>
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
          <Button onClick={addChecklist}>추가</Button>
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
        <strong className="d-block mb-2">메모</strong>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="메모를 입력하세요..."
          disabled
          className="mb-4"
        />

        {/* ===== 상태 변경 ===== */}
        {!isEditMode && (
          <>
            <strong className="d-block mb-2">상태 변경</strong>
            <div className="status-grid">
              <Button variant="dark">출고 전</Button>
              <Button variant="outline-success">출고 완료</Button>
              <Button variant="outline-secondary">진행중</Button>
              <Button variant="outline-secondary">완료</Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default PcDetailPanel;
