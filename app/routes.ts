import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pressure-test", "routes/pressure-test.tsx"),
  route("compare-reports", "routes/compare-reports.tsx"),
  route("show-comparison", "routes/show-comparison.tsx"),
] satisfies RouteConfig;
