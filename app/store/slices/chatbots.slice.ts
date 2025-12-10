import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Chatbot entity interface
 */
export interface Chatbot {
  id: string;
  model_name: string;
  description: string;
  model_version: string;
  created_at: string;
}

/**
 * Chatbots state interface
 */
interface ChatbotsState {
  chatbots: Chatbot[];
  selectedChatbotId: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial mock chatbots for development/demo purposes
 */
const mockChatbots: Chatbot[] = [
  {
    id: "d4e5f6a7-8901-23de-f012-444444444444",
    model_name: "GPT-4 Turbo",
    description: "Advanced language model with improved reasoning capabilities and extended context window. Optimized for complex tasks and nuanced conversations.",
    model_version: "4.0.2",
    created_at: "2025-02-10T10:00:00.000Z",
  },
  {
    id: "e5f6a7b8-9012-34ef-0123-555555555555",
    model_name: "Claude 3 Opus",
    description: "Highly capable AI assistant focused on safety and helpfulness. Excels at analysis, writing, and coding tasks.",
    model_version: "3.1.0",
    created_at: "2025-04-15T14:30:00.000Z",
  },
  {
    id: "f6a7b8c9-0123-45f0-1234-666666666666",
    model_name: "Gemini Pro",
    description: "Multimodal AI model capable of understanding text, images, and code. Built for enterprise-scale applications.",
    model_version: "1.5.3",
    created_at: "2025-06-20T08:45:00.000Z",
  },
  {
    id: "a7b8c9d0-1234-56a1-2345-777777777777",
    model_name: "Llama 3 70B",
    description: "Open-source large language model optimized for efficiency and customization. Ideal for on-premise deployments.",
    model_version: "3.0.1",
    created_at: "2025-08-05T16:20:00.000Z",
  },
];

const initialState: ChatbotsState = {
  chatbots: mockChatbots,
  selectedChatbotId: null,
  isLoading: false,
  error: null,
};

export const chatbotsSlice = createSlice({
  name: "chatbots",
  initialState,
  reducers: {
    // Set all chatbots (replace)
    setChatbots: (state, action: PayloadAction<Chatbot[]>) => {
      state.chatbots = action.payload;
      state.error = null;
    },

    // Add a single chatbot
    addChatbot: (state, action: PayloadAction<Chatbot>) => {
      state.chatbots.push(action.payload);
    },

    // Update an existing chatbot
    updateChatbot: (state, action: PayloadAction<Chatbot>) => {
      const index = state.chatbots.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.chatbots[index] = action.payload;
      }
    },

    // Remove a chatbot by ID
    removeChatbot: (state, action: PayloadAction<string>) => {
      state.chatbots = state.chatbots.filter((c) => c.id !== action.payload);
      // Clear selection if removed chatbot was selected
      if (state.selectedChatbotId === action.payload) {
        state.selectedChatbotId = null;
      }
    },

    // Select a chatbot
    selectChatbot: (state, action: PayloadAction<string | null>) => {
      state.selectedChatbotId = action.payload;
    },

    // Loading state management
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Error state management
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear all chatbots
    clearChatbots: (state) => {
      state.chatbots = [];
      state.selectedChatbotId = null;
      state.error = null;
    },
  },
  selectors: {
    selectAllChatbots: (state) => state.chatbots,
    selectChatbotsCount: (state) => state.chatbots.length,
    selectSelectedChatbotId: (state) => state.selectedChatbotId,
    selectSelectedChatbot: (state) =>
      state.chatbots.find((c) => c.id === state.selectedChatbotId) ?? null,
    selectChatbotById: (state, id: string) =>
      state.chatbots.find((c) => c.id === id) ?? null,
    selectChatbotsLoading: (state) => state.isLoading,
    selectChatbotsError: (state) => state.error,
  },
});

// Export actions
export const {
  setChatbots,
  addChatbot,
  updateChatbot,
  removeChatbot,
  selectChatbot,
  setLoading: setChatbotsLoading,
  setError: setChatbotsError,
  clearChatbots,
} = chatbotsSlice.actions;

// Export selectors
export const {
  selectAllChatbots,
  selectChatbotsCount,
  selectSelectedChatbotId,
  selectSelectedChatbot,
  selectChatbotById,
  selectChatbotsLoading,
  selectChatbotsError,
} = chatbotsSlice.selectors;

export default chatbotsSlice.reducer;

