import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pressure-test", "routes/pressure-test.tsx"),
  route("compare-reports", "routes/compare-reports.tsx"),
  route("show-comparison", "routes/show-comparison.tsx"),
  route("create-new-test", "routes/create-new-test.tsx"),
  route("settings", "routes/settings.tsx"),
  route("policy-manager", "routes/policy-manager.tsx"),
] satisfies RouteConfig;
