import { Card, Form } from "react-bootstrap";

const PcList = () => {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="mb-3">
          <Card.Body className="d-flex justify-content-between">
            <div>
              <div className="fw-bold">이유민B</div>
              <div className="text-muted">Windows · 16ML · 코어 · 어시</div>
              <small>요청: 2025-11-20</small>
            </div>
            <Form.Check />
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default PcList;
