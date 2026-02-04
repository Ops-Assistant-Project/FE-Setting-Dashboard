import { useState } from "react";
import { createSetting } from "../api/setting";
import type { CreateSettingPayload, Setting } from "../api/setting";

export const useCreateSetting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (payload: CreateSettingPayload): Promise<Setting> => {
    setLoading(true);
    setError(null);

    try {
      const res = await createSetting(payload);
      return res.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    loading,
    error,
  };
};
