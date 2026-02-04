import { Card, Col, Row } from "react-bootstrap";

interface Stat {
  title: string;
  value: number;
}

interface StatCardsProps {
  stats: Stat[];
}

const StatCards = ({ stats }: StatCardsProps) => {
  return (
    <Row className="mb-4">
      {stats.map((s) => (
        <Col key={s.title}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-muted">{s.title}</Card.Title>
              <h3 className="fw-bold">{s.value}</h3>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatCards;
