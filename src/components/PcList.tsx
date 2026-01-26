import { Card, Form } from "react-bootstrap";

interface PcListProps {
  onSelectPc: (pc: Pc) => void;
}

interface Pc {
  id: number;
  name: string;
  os: string;
  model: string;
  role: string;
  company: string;
}

const dummyPcList: Pc[] = [
  {
    id: 1,
    name: "이유민B",
    os: "Windows",
    model: "16ML",
    role: "어시",
    company: "코어",
  },
  {
    id: 2,
    name: "홍길동A",
    os: "Mac",
    model: "Macbook Pro",
    role: "어시",
    company: "코어",
  },
  {
    id: 3,
    name: "김철수C",
    os: "Windows",
    model: "ThinkPad",
    role: "정규",
    company: "코어",
  },
];

const PcList = ({ onSelectPc }: PcListProps) => {
  return (
    <>
      {dummyPcList.map((pc) => (
        <Card
          key={pc.id}
          className="mb-3"
          style={{ cursor: "pointer" }}
          onClick={() => onSelectPc(pc)}
        >
          <Card.Body className="d-flex justify-content-between">
            <div>
              <div className="fw-bold">{pc.name}</div>
              <div className="text-muted">
                {pc.os} · {pc.model} · {pc.company} · {pc.role}
              </div>
              <small>요청: 2025-11-20</small>
            </div>

            <Form.Check onClick={(e) => e.stopPropagation()} />
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default PcList;
