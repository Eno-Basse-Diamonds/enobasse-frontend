import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type AlertType = "success" | "error" | "warning" | "info";

interface Alert {
  id: string;
  type: AlertType;
  title?: string;
  message: React.ReactNode;
  duration?: number;
  dismissible?: boolean;
}

interface AlertStore {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "id">) => void;
  removeAlert: (id: string) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  addAlert: (alert) => {
    const id = uuidv4();
    set((state) => ({ alerts: [...state.alerts, { ...alert, id }] }));

    if (alert.duration) {
      setTimeout(() => {
        set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) }));
      }, alert.duration);
    }
  },
  removeAlert: (id) => {
    set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) }));
  },
}));
