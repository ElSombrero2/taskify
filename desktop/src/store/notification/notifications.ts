import { Notification } from "@/types/notification";
import { create } from "zustand";

type NotificationState = {
  notifications: Notification[],
  push: (notification: Notification) => void,
	remove: (id: string) => void, 
}

export const useNotification = create<NotificationState>((set, get) => ({
	notifications: [],
	push: (notification: Notification) => {
		const { notifications } = get();
		notifications.push(notification);
		set((state) => ({ ...state, notifications }));
	},
	remove: (id: string) => {
		const { notifications } = get();
		set((state) => ({
			...state,
			notifications: notifications.filter((n) => n.id !== id),
		}))
	}
}));
