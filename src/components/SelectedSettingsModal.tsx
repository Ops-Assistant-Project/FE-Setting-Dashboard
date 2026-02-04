import { Modal, Badge } from "react-bootstrap";
import type { Setting } from "../api/setting";
import { companyLabels, onboardingTypeLabels } from "../constants/labels";
import { onboardingTypeBadges } from "../constants/badges";

interface SelectedSettingsModalProps {
  show: boolean;
  onClose: () => void;
  selectedSettings: Setting[];
}

const SelectedSettingsModal = ({
  show,
  onClose,
  selectedSettings,
}: SelectedSettingsModalProps) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header>
        <Modal.Title>선택된 항목 ({selectedSettings.length}건)</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {selectedSettings.length === 0 ? (
          <div className="text-muted">선택된 항목이 없어요</div>
        ) : (
          <ul className="list-group">
            {selectedSettings.map((setting) => (
              <li
                key={setting.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <div className="fw-bold">
                    {setting.user_name} / {setting.user_email}
                  </div>
                  <div className="text-muted">
                    {" "}
                    <Badge
                      bg={
                        onboardingTypeBadges[setting.onboarding_type] ||
                        "primary"
                      }
                    >
                      {onboardingTypeLabels[setting.onboarding_type] || "-"}
                    </Badge>{" "}
                    · {setting.os || "-"} · {setting.model}({setting.serial}) ·{" "}
                    {companyLabels[setting.company]}{" "}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          닫기
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectedSettingsModal;
