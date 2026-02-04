import { useState } from "react";
import { runQuickAction } from "../api/setting";

interface ExecuteParams {
  action: string;
  settingIds: string[];
  requestedBy: string;
}

export const useQuickAction = () => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = async ({
    action,
    settingIds,
    requestedBy,
  }: ExecuteParams) => {
    try {
      setLoadingAction(action);
      setError(null);

      await runQuickAction(action, {
        setting_ids: settingIds,
        requested_by: requestedBy,
      });
    } catch (e) {
      console.error(`❌ ${action} error`, e);
      setError("빠른 작업 실행 실패");
      throw e;
    } finally {
      setLoadingAction(null);
    }
  };

  return {
    execute,
    loadingAction,
    error,
  };
};
