import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useCreateSetting } from "../hooks/useCreateSetting";
import type { ToastController } from "../constants/toast";

interface Props {
  show: boolean;
  listRefetch: () => Promise<void>;
  toast: ToastController;
  onClose: () => void;
}

const CreatePcSettingModal = ({ show, listRefetch, toast, onClose }: Props) => {
  const today = new Date().toISOString().slice(0, 10);
  const [hasAsset, setHasAsset] = useState(false);
  const { create, loading } = useCreateSetting();

  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    urgency: false,
    company: "core",
    role: "team",
    collaborators: "",
    serial: "",
    os: "Mac",
    model: "",
    device_type: "EDP001",
    network_type: "team",
    onboarding_type: "pending",
    requested_date: today,
    due_date: "",
    status: "pending",
    memo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await create({
        ...form,
        ...(hasAsset && {
          os: "",
          model: "",
          device_type: "",
          network_type: "",
        }),
      });
      onClose();
      await listRefetch();
      toast.openToast("세팅이 추가되었어요", "success");
    } catch {
      toast.openToast("세팅 추가에 실패했어요", "error");
    }
  };

  const handleReset = () => {
    setForm({
      user_name: "",
      user_email: "",
      urgency: false,
      company: "core",
      role: "team",
      collaborators: "",
      serial: "",
      os: "Mac",
      model: "",
      device_type: "EDP001",
      network_type: "team",
      onboarding_type: "pending",
      requested_date: today,
      due_date: "",
      status: "pending",
      memo: "",
    });
    setHasAsset(false);
  };

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
              <Form.Control
                name="user_name"
                value={form.user_name}
                onChange={handleChange}
                placeholder="이름 입력"
              />
            </Col>

            <Col>
              <Form.Label>이메일 *</Form.Label>
              <Form.Control
                name="user_email"
                value={form.user_email}
                onChange={handleChange}
                placeholder="email@company.com"
              />
            </Col>

            <Col>
              <Form.Label>긴급도 *</Form.Label>
              <Form.Select
                value={form.urgency ? "true" : "false"}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    urgency: e.target.value === "true",
                  }))
                }
              >
                <option value="false">일반</option>
                <option value="true">급건</option>
              </Form.Select>
            </Col>
          </Row>

          {/* ===== 2 row ===== */}
          <Row className="mb-3">
            <Col>
              <Form.Label>계열사 *</Form.Label>
              <Form.Select
                name="company"
                value={form.company}
                onChange={handleChange}
              >
                <option value="core">코어</option>
                <option value="bank">뱅크</option>
                <option value="insu">인슈</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>구분 *</Form.Label>
              <Form.Select
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="team">팀원</option>
                <option value="asst">어시</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>협업 팀원</Form.Label>
              <Form.Control
                name="collaborators"
                value={form.collaborators}
                onChange={handleChange}
                disabled={form.role === "team"}
                placeholder="협업 팀원 이름"
              />
            </Col>
          </Row>

          {/* ===== 3 row ===== */}
          <Row className="mb-3">
            <Col>
              <Form.Label>시리얼 넘버 *</Form.Label>
              <Form.Control
                name="serial"
                value={form.serial}
                onChange={handleChange}
                placeholder="C02ABC123XYZ"
              />
            </Col>

            <Col>
              <Form.Label>OS *</Form.Label>
              <Form.Select
                name="os"
                value={form.os}
                onChange={handleChange}
                disabled={hasAsset}
              >
                <option value="">선택</option>
                <option value="Mac">Mac</option>
                <option value="Windows">Windows</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>장비 모델 *</Form.Label>
              <Form.Control
                name="model"
                value={form.model}
                onChange={handleChange}
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
              <Form.Select
                name="device_type"
                value={form.device_type}
                onChange={handleChange}
                disabled={hasAsset}
              >
                <option value="EDP001">EDP001</option>
                <option value="EDP002">EDP002</option>
                <option value="EDP003">EDP003</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>망 종류 *</Form.Label>
              <Form.Select
                name="network_type"
                value={form.network_type}
                onChange={handleChange}
                disabled={hasAsset}
              >
                <option value="team">team</option>
                <option value="sec">sec</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label>유형 *</Form.Label>
              <Form.Select
                name="onboarding_type"
                value={form.onboarding_type}
                onChange={handleChange}
              >
                <option value="pending">미정</option>
                <option value="new">신규입사</option>
                <option value="replace">교체</option>
                <option value="return">복직</option>
                <option value="switch">전환</option>
              </Form.Select>
            </Col>
          </Row>

          {/* ===== 5 row ===== */}
          <Row className="mb-3">
            <Col>
              <Form.Label>요청일 *</Form.Label>
              <Form.Control
                type="date"
                name="requested_date"
                value={form.requested_date}
                onChange={handleChange}
              />
            </Col>

            <Col>
              <Form.Label>마감일 *</Form.Label>
              <Form.Control
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
              />
            </Col>

            <Col>
              <Form.Label>상태 *</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="pending">출고 전</option>
                <option value="shipped">출고 완료</option>
                <option value="setting">세팅 중</option>
                <option value="completed">세팅 완료</option>
              </Form.Select>
            </Col>
          </Row>

          {/* ===== 메모 ===== */}
          <Form.Label>메모</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="memo"
            value={form.memo}
            onChange={handleChange}
            placeholder="추가 메모"
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>

        <Button variant="outline-secondary" onClick={handleReset}>
          초기화
        </Button>

        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "추가 중..." : "추가"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePcSettingModal;
