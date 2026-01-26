import { useEffect, useState } from "react";
import { fetchSettingList } from "../api/setting";
import type { Setting } from "../api/setting";

export const useSettingList = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettingList()
      .then((res) => setSettings(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
};
