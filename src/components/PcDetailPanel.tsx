import { Button, Card, ListGroup } from "react-bootstrap";

const PcDetailPanel = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>이유민B</Card.Title>
        <div className="text-muted mb-3">asst2508210@tosspartners.com</div>

        <ListGroup variant="flush">
          <ListGroup.Item>OS: Windows</ListGroup.Item>
          <ListGroup.Item>장비 모델: 16ML</ListGroup.Item>
          <ListGroup.Item>구분: 어시</ListGroup.Item>
          <ListGroup.Item>긴급도: 일반</ListGroup.Item>
        </ListGroup>

        <div className="mt-3 d-grid gap-2">
          <Button variant="outline-primary">출고 전</Button>
          <Button variant="outline-success">출고 완료</Button>
          <Button variant="outline-secondary">진행중</Button>
          <Button variant="outline-dark">완료</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PcDetailPanel;
