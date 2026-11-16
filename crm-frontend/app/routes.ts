import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("login", "./routes/login.tsx"),
  layout("./routes/protectedLayout.tsx", [
    index("./routes/leads.tsx"),
    route(":id", "./routes/lead.tsx"),
  ]),
] satisfies RouteConfig;
