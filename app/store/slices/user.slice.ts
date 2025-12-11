import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Notification preferences interface
 */
export interface NotificationPreferences {
  receive_marketing_email: boolean;
  receive_email_on_report_ready: boolean;
  notification_pause_hrs: number;
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  theme_mode: "light" | "dark";
}

/**
 * Combined preferences interface
 */
export interface Preferences {
  notifications: NotificationPreferences;
  user_preferences: UserPreferences;
}

/**
 * User entity interface
 */
export interface User {
  id: string;
  email: string;
  organization_name: string;
  organization_id: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  preferences: Preferences;
}

/**
 * User state interface
 */
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Default user for new/first-time users
 */
const defaultUser: User = {
  id: "",
  email: "",
  organization_name: "",
  organization_id: "",
  first_name: "",
  last_name: "",
  is_admin: false,
  preferences: {
    notifications: {
      receive_marketing_email: false,
      receive_email_on_report_ready: true,
      notification_pause_hrs: 0,
    },
    user_preferences: {
      theme_mode: "light",
    },
  },
};

const initialState: UserState = {
  user: defaultUser,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set the entire user object
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    // Update user's name (first and last)
    setUserName: (state, action: PayloadAction<{ first_name: string; last_name: string }>) => {
      if (state.user) {
        state.user.first_name = action.payload.first_name;
        state.user.last_name = action.payload.last_name;
      }
    },

    // Update just first name
    setFirstName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.first_name = action.payload;
      }
    },

    // Update just last name
    setLastName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.last_name = action.payload;
      }
    },

    // Update email
    setEmail: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.email = action.payload;
      }
    },

    // Update organization
    setOrganization: (state, action: PayloadAction<{ name: string; id: string }>) => {
      if (state.user) {
        state.user.organization_name = action.payload.name;
        state.user.organization_id = action.payload.id;
      }
    },

    // Update notification preferences
    setNotificationPreferences: (state, action: PayloadAction<Partial<NotificationPreferences>>) => {
      if (state.user) {
        state.user.preferences.notifications = {
          ...state.user.preferences.notifications,
          ...action.payload,
        };
      }
    },

    // Update user preferences (theme, etc.)
    setUserPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      if (state.user) {
        state.user.preferences.user_preferences = {
          ...state.user.preferences.user_preferences,
          ...action.payload,
        };
      }
    },

    // Update theme mode specifically
    setThemeMode: (state, action: PayloadAction<"light" | "dark">) => {
      if (state.user) {
        state.user.preferences.user_preferences.theme_mode = action.payload;
      }
    },

    // Loading state management
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Error state management
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear user (logout)
    clearUser: (state) => {
      state.user = defaultUser;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUserLoading: (state) => state.isLoading,
    selectUserError: (state) => state.error,
    selectUserFullName: (state) => 
      state.user ? `${state.user.first_name} ${state.user.last_name}`.trim() : "",
    selectUserFirstName: (state) => state.user?.first_name ?? "",
    selectUserLastName: (state) => state.user?.last_name ?? "",
    selectUserEmail: (state) => state.user?.email ?? "",
    selectUserOrganization: (state) => state.user?.organization_name ?? "",
    selectUserPreferences: (state) => state.user?.preferences ?? null,
    selectNotificationPreferences: (state) => state.user?.preferences.notifications ?? null,
    selectThemeMode: (state) => state.user?.preferences.user_preferences.theme_mode ?? "light",
    selectIsAdmin: (state) => state.user?.is_admin ?? false,
  },
});

// Export actions
export const {
  setUser,
  setUserName,
  setFirstName,
  setLastName,
  setEmail,
  setOrganization,
  setNotificationPreferences,
  setUserPreferences,
  setThemeMode,
  setLoading: setUserLoading,
  setError: setUserError,
  clearUser,
} = userSlice.actions;

// Export selectors
export const {
  selectUser,
  selectIsAuthenticated,
  selectUserLoading,
  selectUserError,
  selectUserFullName,
  selectUserFirstName,
  selectUserLastName,
  selectUserEmail,
  selectUserOrganization,
  selectUserPreferences,
  selectNotificationPreferences,
  selectThemeMode,
  selectIsAdmin,
} = userSlice.selectors;

export default userSlice.reducer;

