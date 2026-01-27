import { Card, Form } from "react-bootstrap";
import { useSettingList } from "../hooks/useSettingList";
import { companyLabels } from "../constants/labels";

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
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
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
