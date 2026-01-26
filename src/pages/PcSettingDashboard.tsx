import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCards from "../components/StatCards";
import PcList from "../components/PcList";
import PcDetailPanel from "../components/PcDetailPanel";
import PcFilterPanel from "../components/PcFilterPanel";
import BatchPanel from "../components/BatchPanel";

const PcSettingDashboard = () => {
  const [rightPanel, setRightPanel] = useState<"none" | "detail" | "batch">(
    "none",
  );
  const [selectedPc, setSelectedPc] = useState<any | null>(null);

  /** 데이터 클릭 → 상세 패널 */
  const handleSelectPc = (pc: any) => {
    setSelectedPc(pc);
    setRightPanel("detail");
  };

  /** 일괄 작업 클릭 */
  const handleOpenBatch = () => {
    setSelectedPc(null);
    setRightPanel("batch");
  };

  /** 패널 닫기 */
  const handleClosePanel = () => {
    setSelectedPc(null);
    setRightPanel("none");
  };

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
              <PcFilterPanel onOpenBatch={handleOpenBatch} />
              <PcList onSelectPc={handleSelectPc} />
            </Col>

            <Col lg={4} xl={3}>
              {rightPanel === "detail" && selectedPc && (
                <PcDetailPanel pc={selectedPc} onClose={handleClosePanel} />
              )}

              {rightPanel === "batch" && (
                <BatchPanel onClose={handleClosePanel} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PcSettingDashboard;
