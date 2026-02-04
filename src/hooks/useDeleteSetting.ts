import { useState } from "react";
import { deleteSetting } from "../api/setting";

export const useDeleteSetting = () => {
  const [loading, setLoading] = useState(false);

  const remove = async (settingId: string) => {
    try {
      setLoading(true);
      await deleteSetting(settingId);
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
};
