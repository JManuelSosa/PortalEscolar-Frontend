import { notification } from "antd";
import { create } from "zustand";

export const useNotificationStore = create( (set) => ({
    notificationApi: null,
    setNotificationApi: (api) => set({ notificationApi: api })
}));