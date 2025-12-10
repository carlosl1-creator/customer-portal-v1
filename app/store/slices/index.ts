/**
 * Barrel export for all Redux slices
 * Import slices here and re-export them for cleaner imports
 */

export { default as appReducer } from "./app.slice";
export * from "./app.slice";

export { default as policiesReducer } from "./policies.slice";
export * from "./policies.slice";

