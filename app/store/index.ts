/**
 * Redux Store - Main Entry Point
 * 
 * This file serves as the public API for the Redux store.
 * Import from here rather than individual files for cleaner imports.
 * 
 * @example
 * import { useAppDispatch, useAppSelector, setLoading, selectIsLoading } from '~/store';
 */

// Export store and types
export { store, makeStore } from "./store";
export type { RootState, AppDispatch, AppStore } from "./store";

// Export typed hooks
export { useAppDispatch, useAppSelector, useAppStore } from "./hooks";

// Export provider
export { StoreProvider } from "./provider";

// Export all slice actions and selectors
export * from "./slices";

