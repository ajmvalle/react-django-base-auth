import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("login", "routes/auth/login.tsx"),
  route("register", "routes/auth/register.tsx"),
  route("dashboard", "routes/dashboard.tsx"),

  route("theme", "layout/AppLayout.tsx", [
    index("routes/theme/Dashboard/Home.tsx"),
    route("profile", "routes/theme/UserProfiles.tsx"),
    route("calendar", "routes/theme/Calendar.tsx"),
    route("blank", "routes/theme/Blank.tsx"),

    route("form-elements", "routes/theme/Forms/FormElements.tsx"),
    route("basic-tables", "routes/theme/Tables/BasicTables.tsx"),

    route("alerts", "routes/theme/UiElements/Alerts.tsx"),
    route("avatars", "routes/theme/UiElements/Avatars.tsx"),
    route("badge", "routes/theme/UiElements/Badges.tsx"),
    route("buttons", "routes/theme/UiElements/Buttons.tsx"),
    route("images", "routes/theme/UiElements/Images.tsx"),
    route("videos", "routes/theme/UiElements/Videos.tsx"),

    route("line-chart", "routes/theme/Charts/LineChart.tsx"),
    route("bar-chart", "routes/theme/Charts/BarChart.tsx"),
    
  ]),

  route("theme-auth", "routes/theme/AuthPages/AuthPageLayout.tsx", [
    route("sign-in", "routes/theme/AuthPages/SignIn.tsx"),
    route("sign-up", "routes/theme/AuthPages/SignUp.tsx"),
  ]),

  route("*", "routes/theme/OtherPage/NotFound.tsx"),
] satisfies RouteConfig;
