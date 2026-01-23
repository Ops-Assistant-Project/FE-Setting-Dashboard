import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCards from "../components/StatCards";
import PcList from "../components/PcList";
import PcDetailPanel from "../components/PcDetailPanel";

const PcSettingDashboard = () => {
  return (
    <>
      <Header />

      <div className="d-flex">
        <Sidebar />

        <Container fluid className="p-4">
          <h4 className="mb-4">PC 세팅 대시보드</h4>

          <Row>
            {/* 왼쪽 메인 영역 */}
            <Col lg={8} xl={9}>
              <StatCards />

              <Row className="mb-3 mt-3">
                <Col>
                  <Form.Control placeholder="이름 또는 이메일 검색" />
                </Col>
                <Col xs="auto">
                  <Button>신규 세팅 추가</Button>
                </Col>
              </Row>

              <PcList />
            </Col>

            {/* 오른쪽 상세 패널 */}
            <Col lg={4} xl={3}>
              <PcDetailPanel />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PcSettingDashboard;
