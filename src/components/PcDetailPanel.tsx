import { useState } from "react";
import { Card, Badge, Button, Form } from "react-bootstrap";
import PencilIcon from "../assets/icons/pencil.png";
import BinIcon from "../assets/icons/bin.png";

const PcDetailPanel = () => {
  type ChecklistItem = {
    text: string;
    checked: boolean;
  };

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
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Badge bg="danger">미정</Badge>

          <button className="btn p-0 border-0 bg-transparent">✕</button>
        </div>

        <h5 className="fw-bold mb-1">이유민B</h5>
        <div className="text-muted mb-3">asst2508210@tosspartners.com</div>

        <hr />

        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>기본 정보</strong>
          <img src={PencilIcon} width={14} height={14} />
        </div>

        <div className="mb-4">
          {[
            ["OS", "Windows"],
            ["장비 모델", "16ML"],
            ["장비 종류", "인터넷망 - 인터넷 PC"],
            ["시리얼 넘버", "11199"],
            ["계열사", "코어"],
            ["구분", "어시"],
            ["긴급도", "일반"],
            ["요청일", "2025-11-20"],
          ].map(([label, value]) => (
            <div key={label} className="d-flex justify-content-between mb-2">
              <span className="text-muted">{label}</span>
              <span>{value}</span>
            </div>
          ))}
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

        <div className="d-flex align-items-center gap-2 mb-3">
          <Form.Control
            placeholder="새로운 체크리스트 항목 추가..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button onClick={addChecklist} className="checklist-add-btn">
            추가
          </Button>
        </div>

        {/* ===== 체크리스트 목록 ===== */}
        <ul className="checklist-list">
          {checklist.map((item, index) => (
            <li key={index} className="checklist-item">
              {/* 왼쪽: 체크박스 + 텍스트 */}
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

              {/* 오른쪽: 삭제 아이콘 */}
              <button
                className="delete-btn"
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
          <img src={PencilIcon} width={14} height={14} />
        </div>

        <Form.Control
          as="textarea"
          rows={3}
          placeholder="메모를 입력하세요..."
          disabled
          className="mb-4"
        />

        {/* ===== 상태 변경 ===== */}
        <strong className="d-block mb-2">상태 변경</strong>

        <div className="status-grid">
          <Button variant="dark">출고 전</Button>
          <Button variant="outline-success">출고 완료</Button>
          <Button variant="outline-secondary">진행중</Button>
          <Button variant="outline-secondary">완료</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PcDetailPanel;
