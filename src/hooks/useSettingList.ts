import { useEffect, useState } from "react";
import { fetchSettingList } from "../api/setting";
import type { Setting } from "../api/setting";

export const useSettingList = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetchSettingList();
      setSettings(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return {
    settings,
    loading,
    refetch: fetchList,
  };
};
