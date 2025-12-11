import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * App-level state interface
 * Contains general application state like loading, notifications, etc.
 */
interface AppState {
  isLoading: boolean;
  sidebarCollapsed: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  timestamp: number;
}

const initialState: AppState = {
  isLoading: false,
  sidebarCollapsed: false,
  notifications: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id" | "timestamp">>
    ) => {
      const notification: Notification = {
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectSidebarCollapsed: (state) => state.sidebarCollapsed,
    selectNotifications: (state) => state.notifications,
  },
});

// Export actions
export const {
  setLoading,
  toggleSidebar,
  setSidebarCollapsed,
  addNotification,
  removeNotification,
  clearNotifications,
} = appSlice.actions;

// Export selectors
export const { selectIsLoading, selectSidebarCollapsed, selectNotifications } =
  appSlice.selectors;

export default appSlice.reducer;

