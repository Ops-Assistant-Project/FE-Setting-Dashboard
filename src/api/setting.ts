import apiClient from "./client";

export interface QuickAction {
  action: string;
  requested_by: string;
  requested_at: string; // ISO string
  status: "done" | "n/a" | "pending" | "failed";
  error_message: string | null;
}

export interface Setting {
  id: string;

  user_name: string;
  user_email: string;

  company: string;
  role: string;

  os: string;
  model: string;
  serial: string;

  device_type: string;
  network_type: string;

  urgency: boolean; // true = 급건
  onboarding_type: "new" | "switch" | "return" | "replace" | string;

  status: "pending" | "progress" | "completed" | string;

  memo: string | null;
  checklist: [];

  quick_actions: QuickAction[];

  assignee_name: string | null;

  requested_date: string; // ISO
  due_date: string | null;
  completed_date: string | null;
}

export const fetchSettingList = () => {
  return apiClient.get<Setting[]>("/settings");
};
