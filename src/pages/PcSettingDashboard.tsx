import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCards from "../components/StatCards";
import PcList from "../components/PcList";
import PcDetailPanel from "../components/PcDetailPanel";
import PcFilterPanel from "../components/PcFilterPanel";
import BatchPanel from "../components/BatchPanel";
import { CommonToast } from "../components/CommonToast";
import { useSettingList } from "../hooks/useSettingList";
import { useToast } from "../hooks/useToast";
import type { Filters } from "../constants/filters";

const PcSettingDashboard = () => {
  const toast = useToast();
  const { settings, loading, refetch: listRefetch } = useSettingList();

  const [rightPanel, setRightPanel] = useState<"none" | "detail" | "batch">(
    "none",
  );
  const [selectedSettingId, setSelectedSettingId] = useState<string | null>(
    null,
  ); // 개별 선택용

  // 일괄 선택용
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedSettings = settings.filter((s) => selectedIds.includes(s.id));

  const [filters, setFilters] = useState<Filters>({
    onboarding_type: "",
    status: "",
    company: "",
    priority: "",
    period: "",
    createdBy: "",
  });
  const [keyword, setKeyword] = useState("");

  const filteredSettings = settings.filter((s) => {
    const keywordMatch =
      !keyword ||
      s.user_name?.toLowerCase().includes(keyword.toLowerCase()) ||
      s.user_email?.toLowerCase().includes(keyword.toLowerCase());

    if (!keywordMatch) return false;

    if (
      filters.onboarding_type &&
      s.onboarding_type !== filters.onboarding_type
    )
      return false;

    if (filters.status && s.status !== filters.status) return false;

    if (filters.company && s.company !== filters.company) return false;

    if (filters.priority && String(s.urgency) !== filters.priority)
      return false;

    if (filters.createdBy && String(s.is_manual) !== filters.createdBy)
      return false;

    // 기간
    if (filters.period) {
      const now = Date.now();
      const days = Number(filters.period);
      const createdAt = new Date(s.requested_date);
      const diff = (now - createdAt.getTime()) / (1000 * 60 * 60 * 24);

      if (diff > days) return false;
    }

    return true;
  });

  const allFilteredIds = filteredSettings.map((s) => s.id);

  const isAllChecked =
    allFilteredIds.length > 0 &&
    allFilteredIds.every((id) => selectedIds.includes(id));

  const isAnyChecked = selectedIds.length > 0;

  const toggleSelectAll = () => {
    if (isAllChecked) {
      setSelectedIds((prev) =>
        prev.filter((id) => !allFilteredIds.includes(id)),
      );
    } else {
      setSelectedIds((prev) =>
        Array.from(new Set([...prev, ...allFilteredIds])),
      );
    }
  };

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
          <CommonToast
            show={toast.toast.show}
            message={toast.toast.message}
            status={toast.toast.status}
            onClose={toast.closeToast}
          />

          <Row>
            <Col lg={8} xl={9}>
              <StatCards stats={stats} />

              <PcFilterPanel
                hasSelection={selectedSettings.length > 0}
                onOpenBatch={handleOpenBatch}
                listRefetch={listRefetch}
                toast={toast}
                filters={filters}
                onChangeFilters={setFilters}
                keyword={keyword}
                onChangeKeyword={setKeyword}
                isAllChecked={isAllChecked}
                isAnyChecked={isAnyChecked}
                onToggleSelectAll={toggleSelectAll}
              />

              <PcList
                settings={filteredSettings}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                onSelectPc={handleSelectPc}
              />
            </Col>

            <Col
              lg={4}
              xl={3}
              className="align-self-start"
              style={{ height: "fit-content" }}
            >
              {rightPanel === "detail" && selectedSettingId && (
                <PcDetailPanel
                  settingId={selectedSettingId}
                  listRefetch={listRefetch}
                  toast={toast}
                  onClose={handleClosePanel}
                />
              )}

              {rightPanel === "batch" && (
                <BatchPanel
                  selectedSettings={selectedSettings}
                  setSelectedIds={setSelectedIds}
                  listRefetch={listRefetch}
                  toast={toast}
                  handleClosePanel={handleClosePanel}
                  onClose={handleClosePanel}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PcSettingDashboard;
