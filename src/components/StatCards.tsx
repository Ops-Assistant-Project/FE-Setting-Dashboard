import { Card, Col, Row } from "react-bootstrap";

const stats = [
  { title: "출고 전", value: 13 },
  { title: "출고 완료", value: 0 },
  { title: "진행 중", value: 0 },
  { title: "완료", value: 0 },
];

const StatCards = () => {
  return (
    <Row className="mb-4">
      {stats.map((s) => (
        <Col key={s.title}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{s.title}</Card.Title>
              <h3>{s.value}</h3>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatCards;
