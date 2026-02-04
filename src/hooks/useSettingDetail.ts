import { useEffect, useState } from "react";
import { fetchSettingDetail } from "../api/setting";
import type { Setting } from "../api/setting";

export const useSettingDetail = (settingId: string | null) => {
  const [setting, setSetting] = useState<Setting | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDetail = async () => {
    if (!settingId) return;

    setLoading(true);
    try {
      const res = await fetchSettingDetail(settingId);
      setSetting(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [settingId]);

  return {
    setting,
    loading,
    refetch: fetchDetail,
  };
};
