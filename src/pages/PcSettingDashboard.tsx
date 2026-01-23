import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCards from "../components/StatCards";
import PcList from "../components/PcList";
import PcDetailPanel from "../components/PcDetailPanel";

const PcSettingDashboard = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Header />

      <div className="d-flex flex-grow-1">
        <Sidebar />

        <Container fluid className="p-4 bg-light">
          <h4 className="mb-4">PC 세팅 대시보드</h4>

          <StatCards />

          <Row className="mb-3">
            <Col>
              <Form.Control placeholder="이름 또는 이메일 검색" />
            </Col>
            <Col xs="auto">
              <Button>신규 세팅 추가</Button>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <PcList />
            </Col>
            <Col md={4}>
              <PcDetailPanel />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PcSettingDashboard;
