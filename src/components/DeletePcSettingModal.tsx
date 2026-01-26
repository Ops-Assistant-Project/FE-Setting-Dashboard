import { Modal, Button } from "react-bootstrap";

interface DeleteSettingModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteSettingModal = ({
  show,
  onClose,
  onConfirm,
}: DeleteSettingModalProps) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>세팅 삭제</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-2 fw-semibold">해당 PC 세팅을 삭제하시겠어요?</p>

        <p className="text-muted mb-0">
          삭제된 세팅은 복구할 수 없으며, <br />
          관련된 작업 내역과 정보도 함께 제거됩니다.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          취소
        </Button>

        <Button variant="danger" onClick={onConfirm}>
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteSettingModal;
