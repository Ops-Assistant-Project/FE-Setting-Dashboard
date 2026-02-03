import { Card, Form, Badge } from "react-bootstrap";
import { companyLabels } from "../constants/labels";
import { onboardingTypeLabels, statusLabels } from "../constants/labels";
import { onboardingTypeBadges, statusBadges } from "../constants/badges";
import type { Setting } from "../api/setting";

interface PcListProps {
  settings: Setting[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  onSelectPc: (settingId: string) => void;
}

const PcList = ({
  settings,
  selectedIds,
  setSelectedIds,
  onSelectPc,
}: PcListProps) => {
  const toggleCheck = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  return (
    <>
      {settings.map((setting) => (
        <Card
          key={setting.id}
          className="mb-3"
          style={{ cursor: "pointer" }}
          onClick={() => onSelectPc(setting.id)}
        >
          <Card.Body className="d-flex justify-content-between">
            <div>
              <Badge
                bg={onboardingTypeBadges[setting.onboarding_type]}
                className="mb-1 me-1"
              >
                {onboardingTypeLabels[setting.onboarding_type]}
              </Badge>

              <Badge bg={statusBadges[setting.status]} className="mb-1 me-1">
                {statusLabels[setting.status]}
              </Badge>

              {setting?.is_manual && (
                <Badge bg="dark" className="me-1">
                  수동
                </Badge>
              )}

              {setting?.urgency && (
                <Badge bg="danger" className="me-1">
                  급건
                </Badge>
              )}

              <div className="fw-bold">
                {setting.user_name} · {setting.user_email}
              </div>

              <div className="text-muted">
                {setting.os} · {setting.model} ·{" "}
                {companyLabels[setting.company] ?? setting.company} ·{" "}
                {setting.role === "team" ? "팀원" : "어시"}
              </div>

              <small>
                요청: {setting.requested_date.split("T")[0]}
                {setting.due_date && (
                  <span> · 마감: {setting.due_date.split("T")[0]}</span>
                )}
                {setting.status == "completed" && setting.completed_date && (
                  <span className="text-success fw-semibold">
                    {" "}
                    · 완료: {setting.completed_date.split("T")[0]}
                  </span>
                )}
              </small>
            </div>

            <Form.Check
              checked={selectedIds.includes(setting.id)}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                e.stopPropagation();
                toggleCheck(setting.id);
              }}
            />
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default PcList;
