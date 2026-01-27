import { useEffect, useState } from "react";
import { fetchSettingDetail } from "../api/setting";
import type { Setting } from "../api/setting";

export const useSettingDetail = (settingId: string | null) => {
  const [setting, setSetting] = useState<Setting | null>(null);

  useEffect(() => {
    if (!settingId) return;

    fetchSettingDetail(settingId).then((res) => {
      setSetting(res.data);
    });
  }, [settingId]);

  const loading = !!settingId && !setting;

  return { setting, loading };
};
