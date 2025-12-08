import type { Benchmark } from "~/components/tables/benchmarks-table/benchmarks-table";

/**
 * Mock benchmarks data for comparison
 * In production, this data would come from API calls
 */
export const MOCK_BENCHMARKS: Benchmark[] = [
  {
    id: "B104",
    bot: "Reinforce Labs Model 2.1",
    description: "Excels at identifying fraud, deception, and abuse",
  },
  {
    id: "B128",
    bot: "SomeAI Model 1.2",
    description: "Focuses on identifying hate speech, violence, and CSAM-related material",
  },
  {
    id: "B140",
    bot: "Another Model 2.0",
    description: "Adheres strictly to given content and branding guidelines",
  },
];

