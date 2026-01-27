import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import CreatePcSettingModal from "./CreatePcSettingModal";

interface PcFilterPanelProps {
  onOpenBatch: () => void;
}

const PcFilterPanel = ({ onOpenBatch }: PcFilterPanelProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 필터 상태들
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    company: "",
    priority: "",
    period: "",
    createdBy: "",
  });

  // 필터가 하나라도 적용됐는지 체크
  const isFiltered = Object.values(filters).some((v) => v !== "");

  const resetFilters = () => {
    setFilters({
      type: "",
      status: "",
      company: "",
      priority: "",
      period: "",
      createdBy: "",
    });
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex align-items-center gap-2 mb-3">
          <Form.Control placeholder="이름 또는 이메일 검색" />
          <Button
            className="filter-action-btn"
            onClick={() => setShowCreateModal(true)}
          >
            신규 세팅 추가
          </Button>

          <CreatePcSettingModal
            show={showCreateModal}
            onClose={() => setShowCreateModal(false)}
          />
        </div>

        <Row className="g-2 align-items-center">
          <Col>
            <Form.Select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">전체 유형</option>
              <option value="pending">미정</option>
              <option value="new">신규입사</option>
              <option value="replace">교체</option>
              <option value="rejoin">복직</option>
              <option value="switch">전환</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">전체 상태</option>
              <option value="pending">출고 전</option>
              <option value="shipped">출고 완료</option>
              <option value="setting">진행 중</option>
              <option value="completed">완료</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Select
              value={filters.company}
              onChange={(e) =>
                setFilters({ ...filters, company: e.target.value })
              }
            >
              <option value="">전체 회사</option>
              <option value="core">코어</option>
              <option value="bank">뱅크</option>
              <option value="insu">인슈</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Select
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
            >
              <option value="">전체 긴급도</option>
              <option value="false">일반</option>
              <option value="true">급건</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Select
              value={filters.period}
              onChange={(e) =>
                setFilters({ ...filters, period: e.target.value })
              }
            >
              <option value="">전체 기간</option>
              <option value="7">7일</option>
              <option value="30">30일</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Select
              value={filters.createdBy}
              onChange={(e) =>
                setFilters({ ...filters, createdBy: e.target.value })
              }
            >
              <option value="">전체 생성 방식</option>
              <option value="true">수동</option>
              <option value="false">자동</option>
            </Form.Select>
          </Col>

          {/* 필터 초기화 (조건부 렌더링) */}
          <Col xs="auto">
            <Button
              className="filter-action-btn"
              variant="outline-secondary"
              onClick={resetFilters}
              style={{
                visibility: isFiltered ? "visible" : "hidden",
              }}
            >
              필터 초기화
            </Button>
          </Col>

          <Col xs="auto">
            <Button
              className="filter-action-btn"
              variant="outline-primary"
              onClick={onOpenBatch}
            >
              일괄 작업
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PcFilterPanel;
