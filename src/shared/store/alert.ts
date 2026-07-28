import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

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

/**
 * Alert notification store.
 *
 * @description Global alert notification store. Provides `addAlert` to push
 * notifications and `removeAlert` to dismiss them.
 * @returns An object with `alerts` array, `addAlert` and `removeAlert` methods
 *
 * @example
 * const { addAlert } = useAlertStore();
 * addAlert({ type: "success", message: "Saved!", duration: 3000 });
 */
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
