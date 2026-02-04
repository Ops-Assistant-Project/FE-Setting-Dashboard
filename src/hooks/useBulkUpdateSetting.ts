import { useState } from "react";
import { bulkUpdateSetting } from "../api/setting";
import type { BulkSettingUpdatePayload } from "../api/setting";

export const useBulkUpdateSetting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const bulkUpdate = async (payload: BulkSettingUpdatePayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await bulkUpdateSetting(payload);
      return res.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    bulkUpdate,
    loading,
    error,
  };
};
