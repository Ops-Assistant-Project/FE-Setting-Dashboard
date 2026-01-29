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
type OnboardingType = "new" | "replace" | "rejoin" | "switch";
type OS = "Mac" | "Windows";

const quickActionOrder: Record<
  OnboardingType,
  Partial<Record<OS, string[]>>
> = {
  /** 1. 신규입사 */
  new: {
    Mac: ["okta-setting"],
    Windows: ["okta-setting", "win-setting", "o365-intune"],
  },

  /** 2. 교체 */
  replace: {
    Mac: ["password-notice", "okta-setting", "pickup-notice"],
    Windows: [
      "password-notice",
      "okta-setting",
      "win-setting",
      "o365-intune",
      "pickup-notice",
    ],
  },

  /** 3. 복직 */
  rejoin: {
    Mac: ["okta-activate"],
    Windows: ["okta-activate"],
  },

  /** 4. 전환 */
  switch: {
    Mac: ["okta-setting"],
    Windows: ["okta-setting", "win-setting", "o365-intune"],
  },
};

export const sortQuickActions = (
  quickActions: QuickAction[],
  onboardingType: string,
  os: string,
) => {
  const order =
    quickActionOrder[onboardingType as keyof typeof quickActionOrder]?.[
      os as "Mac" | "Windows"
    ];

  if (!order) return quickActions;

  return [...quickActions]
    .filter((qa) => qa.status !== "n/a")
    .sort((a, b) => order.indexOf(a.action) - order.indexOf(b.action));
};
