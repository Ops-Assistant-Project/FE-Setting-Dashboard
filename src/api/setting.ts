import apiClient from "./client";

export interface QuickAction {
  action: string;
  requested_by: string;
  requested_at: string; // ISO string
  status: "done" | "n/a" | "pending" | "failed";
  error_message: string | null;
}

export interface CreateSettingPayload {
  user_name: string;
  user_email: string;
  urgency: boolean;
  company: string;
  role: string;
  collaborators?: string;
  serial?: string;
  os?: string;
  model?: string;
  device_type?: string;
  network_type?: string;
  onboarding_type: string;
  requested_date: string;
  due_date?: string;
  status: string;
  memo?: string | null;
}

export interface Setting {
  id: string;

  user_name: string;
  user_email: string;
  collaborators: string;

  company: string;
  role: string;

  os: string;
  model: string;
  serial: string;

  device_type: string;
  network_type: string;

  urgency: boolean; // true = 급건
  is_manual: boolean; // true = 수동 생성
  onboarding_type: "new" | "switch" | "return" | "replace" | string;

  status: "pending" | "progress" | "completed" | string;

  memo: string;
  checklist: [];

  quick_actions: QuickAction[];

  assignee_name: string;

  requested_date: string; // ISO
  due_date: string;
  completed_date: string;
}

/* ======================
 * API
====================== */

export const fetchSettingList = () => {
  return apiClient.get<Setting[]>("/settings");
};

export const fetchSettingDetail = (settingId: string) => {
  return apiClient.get<Setting>(`/settings/${settingId}`);
};

export const createSetting = (payload: CreateSettingPayload) => {
  return apiClient.post<Setting>("/settings", payload);
};

export const deleteSetting = (settingId: string) => {
  return apiClient.delete(`/settings/${settingId}`);
};
