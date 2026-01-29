import { Card, Form, Badge } from "react-bootstrap";
import { useSettingList } from "../hooks/useSettingList";
import { companyLabels } from "../constants/labels";
import { onboardingTypeLabels, statusLabels } from "../constants/labels";
import { onboardingTypeBadges, statusBadges } from "../constants/badges";

interface PcListProps {
  onSelectPc: (settingId: string) => void;
}

const PcList = ({ onSelectPc }: PcListProps) => {
  const { settings, loading } = useSettingList();

  if (loading) return <div>로딩중...</div>;

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

              <div className="fw-bold">{setting.user_name}</div>

              <div className="text-muted">
                {setting.os} · {setting.model} ·{" "}
                {companyLabels[setting.company] ?? setting.company} ·{" "}
                {setting.role === "team" ? "팀원" : "어시"}
              </div>

              <small>
                요청: {new Date(setting.requested_date).toLocaleDateString()}
              </small>
            </div>

            {/* 일괄 작업용 체크박스 (나중에 상태 관리 붙이면 됨) */}
            <Form.Check onClick={(e) => e.stopPropagation()} />
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default PcList;
