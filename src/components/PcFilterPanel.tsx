import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

const PcFilterPanel = () => {
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
          <Button className="filter-action-btn">신규 세팅 추가</Button>
        </div>

        <Row className="g-2 align-items-center">
          <Col>
            <Form.Select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">전체 유형</option>
              <option value="laptop">노트북</option>
              <option value="desktop">데스크탑</option>
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
              <option value="before">출고 전</option>
              <option value="done">출고 완료</option>
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
              <option value="toss">Toss</option>
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
              <option value="normal">일반</option>
              <option value="high">긴급</option>
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
              <option value="manual">수동</option>
              <option value="auto">자동</option>
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
            <Button className="filter-action-btn" variant="outline-primary">
              일괄 작업
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PcFilterPanel;
