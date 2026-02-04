import powerIcon from "../assets/icons/power.png";
import lockIcon from "../assets/icons/lock.png";
import sendBlueIcon from "../assets/icons/send-blue.png";
import sendRainbowIcon from "../assets/icons/send-rainbow.png";
import settingPurpleIcon from "../assets/icons/setting-purple.png";
import settingPinkIcon from "../assets/icons/setting-pink.png";
import type { QuickAction } from "../api/setting";

export const actionTitleMap: Record<string, string> = {
  "okta-setting": "Okta Setting 그룹 할당",
  "win-setting": "Windows 그룹 할당",
  "o365-intune": "o365 Intune 그룹 할당",
  "password-notice": "비밀번호 초기화 안내",
  "pickup-notice": "장비 픽업 안내",
  "okta-activate": "Okta 계정 활성화",
};

export const actionDescMap: Record<string, string> = {
  "okta-setting": "Setting 그룹 추가 및 비밀번호 초기화",
  "win-setting": "Windows Setting 그룹 추가",
  "o365-intune": "o365 Setting 그룹 추가",
  "password-notice": "비밀번호 초기화 안내 DM 전송",
  "pickup-notice": "장비 수령 안내 DM 전송",
  "okta-activate": "Okta 계정 활성화",
};

export const actionIcons: Record<string, string> = {
  "okta-setting": lockIcon,
  "win-setting": settingPurpleIcon,
  "o365-intune": settingPinkIcon,
  "password-notice": sendRainbowIcon,
  "pickup-notice": sendBlueIcon,
  "okta-activate": powerIcon,
};

// 빠른 작업 카드 정렬 관련
const QUICK_ACTION_RANK: Record<string, number> = {
  "okta-activate": 1,
  "password-notice": 2,
  "okta-setting": 3,
  "win-setting": 4,
  "o365-intune": 5,
  "pickup-notice": 6,
};

export const sortQuickActions = (quickActions: QuickAction[]) => {
  return [...quickActions]
    .filter((qa) => qa.status !== "n/a")
    .sort(
      (a, b) =>
        (QUICK_ACTION_RANK[a.action] ?? 999) -
        (QUICK_ACTION_RANK[b.action] ?? 999),
    );
};

export const sortQuickActionNames = (actions: string[]) =>
  [...actions].sort(
    (a, b) => (QUICK_ACTION_RANK[a] ?? 999) - (QUICK_ACTION_RANK[b] ?? 999),
  );
