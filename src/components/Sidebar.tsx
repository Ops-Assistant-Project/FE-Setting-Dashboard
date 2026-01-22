import { useState } from "react";
import { Nav } from "react-bootstrap";
import { ChevronDown, ChevronRight } from "react-bootstrap-icons";

import PcIcon from "../assets/icons/desktop.png";
import CheckIcon from "../assets/icons/checklist.png";
import AssetIcon from "../assets/icons/magnifier.png";
import DashboardIcon from "../assets/icons/performance.png";
import TicketIcon from "../assets/icons/tickets.png";
import UserIcon from "../assets/icons/user.png";

const Sidebar = () => {
  const [pcOpen, setPcOpen] = useState(true);

  // 지금 페이지 상태 (나중에 router로 대체 가능)
  const currentPage = "setting-dashboard";

  return (
    <div
      className="border-end"
      style={{
        width: 240,
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="p-3 fw-bold fs-5 border-bottom">Innomns</div>

      <Nav className="flex-column p-2 gap-1">
        {/* PC 자산 */}
        <div
          className="d-flex justify-content-between align-items-center px-3 py-2 text-secondary"
          style={{ cursor: "pointer" }}
          onClick={() => setPcOpen(!pcOpen)}
        >
          <img src={PcIcon} alt="PC" width={18} height={18} />
          <span className="fw-semibold">PC 자산</span>
          {pcOpen ? <ChevronDown /> : <ChevronRight />}
        </div>

        {pcOpen && (
          <div className="ms-4">
            <Nav.Link className="rounded px-2 py-2 text-secondary">
              <div className="d-flex align-items-center gap-2">
                <img src={AssetIcon} width={16} height={16} />
                <span>자산 조회</span>
              </div>
            </Nav.Link>

            <Nav.Link
              className={`rounded px-2 py-2 ${
                currentPage === "setting-dashboard"
                  ? "bg-secondary bg-opacity-25 text-dark fw-semibold"
                  : "text-secondary"
              }`}
            >
              <div className="d-flex align-items-center gap-2">
                <img src={DashboardIcon} width={16} height={16} />
                <span>세팅 대시보드</span>
              </div>
            </Nav.Link>
          </div>
        )}

        <hr className="my-2" />

        {/* 기타 메뉴 */}
        <Nav.Link className="px-3 py-2 text-secondary">
          <img src={UserIcon} alt="User" width={18} height={18} />
          사용자
        </Nav.Link>

        <Nav.Link className="px-3 py-2 text-secondary">
          <img src={CheckIcon} alt="Check" width={18} height={18} />
          조직 설정
        </Nav.Link>

        <Nav.Link className="px-3 py-2 text-secondary">
          <img src={TicketIcon} alt="Ticket" width={18} height={18} />
          Ticket 관리
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
