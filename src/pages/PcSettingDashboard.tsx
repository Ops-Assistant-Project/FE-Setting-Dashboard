import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCards from "../components/StatCards";
import PcList from "../components/PcList";
import PcDetailPanel from "../components/PcDetailPanel";
import PcFilterPanel from "../components/PcFilterPanel";
import BatchPanel from "../components/BatchPanel";
import { useSettingList } from "../hooks/useSettingList";

const PcSettingDashboard = () => {
  const { settings, loading } = useSettingList();

  const [rightPanel, setRightPanel] = useState<"none" | "detail" | "batch">(
    "none",
  );
  const [selectedSettingId, setSelectedSettingId] = useState<string | null>(
    null,
  );

  const statMap = settings.reduce(
    (acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const stats = [
    { title: "출고 전", value: statMap.pending ?? 0 },
    { title: "출고 완료", value: statMap.shipped ?? 0 },
    { title: "진행 중", value: statMap.setting ?? 0 },
    { title: "완료", value: statMap.completed ?? 0 },
  ];

  if (loading) return null;

  /** PC 클릭 → 상세 패널 */
  const handleSelectPc = (settingId: string) => {
    setSelectedSettingId(settingId);
    setRightPanel("detail");
  };

  /** 일괄 작업 클릭 */
  const handleOpenBatch = () => {
    setSelectedSettingId(null);
    setRightPanel("batch");
  };

  /** 패널 닫기 */
  const handleClosePanel = () => {
    setSelectedSettingId(null);
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
              <StatCards stats={stats} />
              <PcFilterPanel onOpenBatch={handleOpenBatch} />
              <PcList onSelectPc={handleSelectPc} />
            </Col>

            <Col lg={4} xl={3}>
              {rightPanel === "detail" && selectedSettingId && (
                <PcDetailPanel
                  settingId={selectedSettingId}
                  onClose={handleClosePanel}
                />
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
