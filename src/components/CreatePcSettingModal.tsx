import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
}

const CreatePcSettingModal = ({ show, onClose }: Props) => {
  const [hasAsset, setHasAsset] = useState(false);

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      dialogClassName="pc-setting-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="mb-0">신규 세팅 추가</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="text-muted mb-4">새로운 PC 세팅을 추가합니다</div>
          <Form.Check
            type="checkbox"
            label="자산 조회에 장비가 있어요"
            checked={hasAsset}
            onChange={(e) => setHasAsset(e.target.checked)}
          />
        </div>

        <Form>
          {/* ===== 1 row ===== */}
          <Row className="mb-3">
            <Col>
              <Form.Label>이름 *</Form.Label>
              <Form.Control placeholder="이름 입력" />
            </Col>

            <Col>
              <Form.Label>이메일 *</Form.Label>
              <Form.Control placeholder="email@company.com" />
            </Col>

            <Col>
              <Form.Label>긴급도 *</Form.Label>
              <Form.Select>
                <option>일반</option>
                <option>급건</option>
              </Form.Select>
            </Col>
          </Row>

          {/* ===== 2 row ===== */}
          <Row className="mb-3">
            <Col>
              <Form.Label>계열사 *</Form.Label>
              <Form.Select>
                <option>코어</option>
                <option>기타</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>구분 *</Form.Label>
              <Form.Select>
                <option>팀원</option>
                <option>어시</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>협업 팀원</Form.Label>
              <Form.Control placeholder="협업 팀원 이름" />
            </Col>
          </Row>

          {/* ===== 3 row ===== */}
          <Row className="mb-3">
            <Col>
              <Form.Label>시리얼 넘버 *</Form.Label>
              <Form.Control placeholder="C02ABC123XYZ" />
            </Col>

            <Col>
              <Form.Label>OS *</Form.Label>
              <Form.Select disabled={hasAsset}>
                <option>Mac</option>
                <option>Windows</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>장비 모델 *</Form.Label>
              <Form.Control
                disabled={hasAsset}
                placeholder={
                  hasAsset ? "자산 조회 장비 사용" : "MacBook Pro 14"
                }
              />
            </Col>
          </Row>

          {/* ===== 4 row ===== */}
          <Row className="mb-3">
            <Col>
              <Form.Label>단말 종류</Form.Label>
              <Form.Select disabled={hasAsset}>
                <option>인터넷 PC</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>망 종류 *</Form.Label>
              <Form.Select disabled={hasAsset}>
                <option>인터넷망(team)</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>유형 *</Form.Label>
              <Form.Select>
                <option>신규입사</option>
                <option>교체</option>
                <option>복직</option>
                <option>전환자</option>
              </Form.Select>
            </Col>
          </Row>

          {/* ===== 5 row ===== */}
          <Row className="mb-3">
            <Col>
              <Form.Label>요청일 *</Form.Label>
              <Form.Control type="date" />
            </Col>

            <Col>
              <Form.Label>마감일</Form.Label>
              <Form.Control type="date" />
            </Col>

            <Col>
              <Form.Label>상태 *</Form.Label>
              <Form.Select>
                <option>출고 전</option>
                <option>출고 완료</option>
              </Form.Select>
            </Col>
          </Row>

          {/* ===== 메모 ===== */}
          <Form.Label>메모</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="추가 메모" />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>

        <Button variant="outline-secondary">초기화</Button>

        <Button variant="primary">추가</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePcSettingModal;
