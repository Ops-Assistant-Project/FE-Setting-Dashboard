import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCards from "../components/StatCards";
import PcList from "../components/PcList";
import PcDetailPanel from "../components/PcDetailPanel";
import PcFilterPanel from "../components/PcFilterPanel";

const PcSettingDashboard = () => {
  return (
    <>
      <Header />

      <div className="d-flex">
        <Sidebar />

        <Container fluid className="p-4">
          <h4 className="mb-4">PC 세팅 대시보드</h4>

          <Row>
            <Col lg={8} xl={9}>
              <StatCards />
              <PcFilterPanel />
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
