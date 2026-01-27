import { Card, Form } from "react-bootstrap";
import { useSettingList } from "../hooks/useSettingList";
import type { Setting } from "../api/setting";

interface PcListProps {
  onSelectPc: (setting: Setting) => void;
}

const companyLabels: Record<string, string> = {
  core: "코어",
  bank: "뱅크",
  insu: "인슈",
};

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
          onClick={() => onSelectPc(setting)}
        >
          <Card.Body className="d-flex justify-content-between">
            <div>
              <div className="fw-bold">{setting.user_name}</div>

              <div className="text-muted">
                {setting.os} · {setting.model} ·{" "}
                {companyLabels[setting.company]} ·{" "}
                {setting.role === "team" ? "팀원" : "어시"}
              </div>

              <small>
                요청: {new Date(setting.requested_date).toLocaleDateString()}
              </small>
            </div>

            <Form.Check />
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default PcList;
