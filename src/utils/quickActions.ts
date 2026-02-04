import type { Setting } from "../api/setting";

export const getCommonQuickActions = (settings: Setting[]): string[] => {
  if (settings.length === 0) return [];

  let commonActions = new Set(
    settings[0].quick_actions
      .filter((qa) => qa.status !== "n/a")
      .map((qa) => qa.action),
  );

  for (let i = 1; i < settings.length; i++) {
    const currentActions = new Set(
      settings[i].quick_actions
        .filter((qa) => qa.status !== "n/a")
        .map((qa) => qa.action),
    );

    commonActions = new Set(
      [...commonActions].filter((action) => currentActions.has(action)),
    );
  }

  return [...commonActions];
};
