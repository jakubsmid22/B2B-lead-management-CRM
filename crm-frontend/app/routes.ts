import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  route("login", "./routes/login.tsx"),
  layout("./routes/protectedLayout.tsx", [
    route("/leads", "./routes/leads.tsx"),
    route("/lead/:id", "./routes/lead.tsx"),
  ]),
] satisfies RouteConfig;
