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

/**
 * Initial mock policies for development/demo purposes
 */
const mockPolicies: Policy[] = [
  {
    id: "a1b2c3d4-5678-90ab-cdef-111111111111",
    name: "Content Moderation Policy",
    version: "1.2.0",
    policy_text_md: "# Content Moderation Policy\n\nThis policy governs the moderation of user-generated content to ensure safety and compliance.\n\n## Guidelines\n\n- No harmful or abusive content\n- Respect intellectual property rights\n- Maintain community standards",
    reports: 42,
    created_at: "2025-01-15T09:30:00.000Z",
    updated_at: "2025-11-20T14:45:00.000Z",
    policy_categories: "safety,compliance,content",
  },
  {
    id: "b2c3d4e5-6789-01bc-def0-222222222222",
    name: "Data Privacy Policy",
    version: "2.0.1",
    policy_text_md: "# Data Privacy Policy\n\nThis policy outlines how user data is collected, stored, and processed.\n\n## Principles\n\n- Data minimization\n- Purpose limitation\n- User consent required\n- Right to deletion",
    reports: 18,
    created_at: "2025-03-01T11:00:00.000Z",
    updated_at: "2025-10-05T16:20:00.000Z",
    policy_categories: "privacy,data,compliance",
  },
  {
    id: "c3d4e5f6-7890-12cd-ef01-333333333333",
    name: "AI Safety Guidelines",
    version: "0.9.5",
    policy_text_md: "# AI Safety Guidelines\n\nGuidelines for ensuring safe and responsible AI behavior.\n\n## Core Principles\n\n- Prevent harmful outputs\n- Maintain transparency\n- Avoid bias and discrimination\n- Human oversight required",
    reports: 87,
    created_at: "2025-06-10T08:15:00.000Z",
    updated_at: "2025-12-01T10:30:00.000Z",
    policy_categories: "ai,safety,ethics",
  },
];

const initialState: PoliciesState = {
  policies: mockPolicies,
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

