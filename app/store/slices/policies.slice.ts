import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Policy entity interface
 */
export interface Policy {
  id: string;
  name: string;
  version: string;
  policy_text_md: string;
  reports: number;
  created_at: string;
  updated_at: string;
  policy_categories: string;
}

/**
 * Policies state interface
 */
interface PoliciesState {
  policies: Policy[];
  selectedPolicyId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PoliciesState = {
  policies: [],
  selectedPolicyId: null,
  isLoading: false,
  error: null,
};

export const policiesSlice = createSlice({
  name: "policies",
  initialState,
  reducers: {
    // Set all policies (replace)
    setPolicies: (state, action: PayloadAction<Policy[]>) => {
      state.policies = action.payload;
      state.error = null;
    },

    // Add a single policy
    addPolicy: (state, action: PayloadAction<Policy>) => {
      state.policies.push(action.payload);
    },

    // Update an existing policy
    updatePolicy: (state, action: PayloadAction<Policy>) => {
      const index = state.policies.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.policies[index] = action.payload;
      }
    },

    // Remove a policy by ID
    removePolicy: (state, action: PayloadAction<string>) => {
      state.policies = state.policies.filter((p) => p.id !== action.payload);
      // Clear selection if removed policy was selected
      if (state.selectedPolicyId === action.payload) {
        state.selectedPolicyId = null;
      }
    },

    // Select a policy
    selectPolicy: (state, action: PayloadAction<string | null>) => {
      state.selectedPolicyId = action.payload;
    },

    // Loading state management
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Error state management
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear all policies
    clearPolicies: (state) => {
      state.policies = [];
      state.selectedPolicyId = null;
      state.error = null;
    },
  },
  selectors: {
    selectAllPolicies: (state) => state.policies,
    selectPoliciesCount: (state) => state.policies.length,
    selectSelectedPolicyId: (state) => state.selectedPolicyId,
    selectSelectedPolicy: (state) =>
      state.policies.find((p) => p.id === state.selectedPolicyId) ?? null,
    selectPolicyById: (state, id: string) =>
      state.policies.find((p) => p.id === id) ?? null,
    selectPoliciesLoading: (state) => state.isLoading,
    selectPoliciesError: (state) => state.error,
  },
});

// Export actions
export const {
  setPolicies,
  addPolicy,
  updatePolicy,
  removePolicy,
  selectPolicy,
  setLoading: setPoliciesLoading,
  setError: setPoliciesError,
  clearPolicies,
} = policiesSlice.actions;

// Export selectors
export const {
  selectAllPolicies,
  selectPoliciesCount,
  selectSelectedPolicyId,
  selectSelectedPolicy,
  selectPolicyById,
  selectPoliciesLoading,
  selectPoliciesError,
} = policiesSlice.selectors;

export default policiesSlice.reducer;

