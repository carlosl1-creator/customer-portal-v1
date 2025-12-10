import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  appReducer,
  policiesReducer,
  chatbotsReducer,
  reportsReducer,
  simulationsReducer,
} from "./slices";

/**
 * Storage key for persisted Redux state
 */
const REDUX_STORAGE_KEY = "rl_portal_redux_state";

/**
 * Load persisted state from localStorage
 * Only loads data slices, not app state
 */
function loadPersistedState(): Partial<RootState> | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  
  try {
    const serializedState = localStorage.getItem(REDUX_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const parsed = JSON.parse(serializedState);
    // Return only the persisted data slices
    return {
      policies: parsed.policies,
      chatbots: parsed.chatbots,
      reports: parsed.reports,
      simulations: parsed.simulations,
    };
  } catch (err) {
    console.warn("Failed to load persisted Redux state:", err);
    return undefined;
  }
}

/**
 * Save state to localStorage
 * Only persists data slices, not app state
 */
function saveState(state: RootState): void {
  if (typeof window === "undefined") {
    return;
  }
  
  try {
    const stateToPersist = {
      policies: state.policies,
      chatbots: state.chatbots,
      reports: state.reports,
      simulations: state.simulations,
    };
    const serializedState = JSON.stringify(stateToPersist);
    localStorage.setItem(REDUX_STORAGE_KEY, serializedState);
  } catch (err) {
    console.warn("Failed to save Redux state:", err);
  }
}

/**
 * Root reducer combining all slice reducers
 * Add new reducers here as they are created
 */
const rootReducer = combineReducers({
  app: appReducer,
  policies: policiesReducer,
  chatbots: chatbotsReducer,
  reports: reportsReducer,
  simulations: simulationsReducer,
});

/**
 * Configure and create the Redux store
 * 
 * Best practices implemented:
 * - Uses Redux Toolkit's configureStore for automatic setup
 * - Middleware includes redux-thunk by default
 * - DevTools enabled in development
 * - Proper TypeScript typing
 * - Persistence to localStorage for data slices
 */
export const makeStore = () => {
  const persistedState = loadPersistedState();
  
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // Customize serialization check if needed
        serializableCheck: {
          // Ignore certain action types or paths if you have non-serializable data
          ignoredActions: [],
          ignoredPaths: [],
        },
      }),
    devTools: process.env.NODE_ENV !== "production",
  });
  
  // Subscribe to store changes and persist to localStorage
  store.subscribe(() => {
    saveState(store.getState());
  });
  
  return store;
};

// Create store instance
export const store = makeStore();

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

// Type for the store itself
export type AppStore = ReturnType<typeof makeStore>;

