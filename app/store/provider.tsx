import { Provider } from "react-redux";
import { store } from "./store";
import type { ReactNode } from "react";

interface StoreProviderProps {
  children: ReactNode;
}

/**
 * Redux Store Provider Component
 * 
 * Wraps the application with the Redux Provider
 * Use this component in root.tsx to provide Redux state to the entire app
 * 
 * @example
 * // In root.tsx Layout:
 * <StoreProvider>
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 * </StoreProvider>
 */
export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}

