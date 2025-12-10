import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { appReducer, policiesReducer } from "./slices";

/**
 * Root reducer combining all slice reducers
 * Add new reducers here as they are created
 */
const rootReducer = combineReducers({
  app: appReducer,
  policies: policiesReducer,
});

/**
 * Configure and create the Redux store
 * 
 * Best practices implemented:
 * - Uses Redux Toolkit's configureStore for automatic setup
 * - Middleware includes redux-thunk by default
 * - DevTools enabled in development
 * - Proper TypeScript typing
 */
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
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
};

// Create store instance
export const store = makeStore();

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

// Type for the store itself
export type AppStore = ReturnType<typeof makeStore>;

