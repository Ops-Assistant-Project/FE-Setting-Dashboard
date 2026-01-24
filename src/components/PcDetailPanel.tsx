import { useState } from "react";
import { Card, Badge, Button, Form } from "react-bootstrap";

const PcDetailPanel = () => {
  const [checklist, setChecklist] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [input, setInput] = useState("");

  const addChecklist = () => {
    if (!input.trim()) return;
    setChecklist([...checklist, input]);
    setInput("");
  };

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <Card className="h-100">
      <Card.Body>
        {/* ===== 상단 영역 ===== */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Badge bg="danger">미정</Badge>

          {/* 닫기 버튼 (이미지로 교체 예정) */}
          <button className="btn p-0 border-0 bg-transparent">
            {/* TODO: X 아이콘 이미지로 교체 */}✕
          </button>
        </div>

        <h5 className="fw-bold mb-1">이유민B</h5>
        <div className="text-muted mb-3">asst2508210@tosspartners.com</div>

        <hr />

        {/* ===== 기본 정보 ===== */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>기본 정보</strong>
          {/* TODO: 연필 아이콘 이미지 */}
          <button className="btn p-0 border-0 bg-transparent">✎</button>
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
            {/* TODO: 아이콘 이미지 */}
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

        {checklist.map((item, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            label={
              <span
                style={{
                  textDecoration: checkedItems.includes(index)
                    ? "line-through"
                    : "none",
                }}
              >
                {item}
              </span>
            }
            className="mb-2"
            onChange={() => toggleCheck(index)}
          />
        ))}

        <hr />

        {/* ===== 메모 ===== */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>메모</strong>
          {/* TODO: 연필 아이콘 */}
          <button className="btn p-0 border-0 bg-transparent">✎</button>
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
