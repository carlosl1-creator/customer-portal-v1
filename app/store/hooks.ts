import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

/**
 * Typed hooks for Redux
 * 
 * Use these hooks throughout the app instead of plain `useDispatch` and `useSelector`
 * This provides proper TypeScript inference and autocomplete
 * 
 * @example
 * // In a component:
 * const dispatch = useAppDispatch();
 * const isLoading = useAppSelector(selectIsLoading);
 * 
 * // Dispatch an action:
 * dispatch(setLoading(true));
 */

/**
 * Typed useDispatch hook
 * Automatically infers action types and async thunk support
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed useSelector hook
 * Provides autocomplete for state properties
 */
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * Typed useStore hook
 * Useful for accessing the store directly (rarely needed)
 */
export const useAppStore = useStore.withTypes<AppStore>();

