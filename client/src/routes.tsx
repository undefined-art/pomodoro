import { lazy } from "solid-js";
import AuthGuard from "./guards/AuthGuard";
import { RouteDefinition } from "@solidjs/router";

const Layout = lazy(() => import("./layout"));
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const Error = lazy(() => import("./pages/error"));
const Tasks = lazy(() => import("./pages/tasks"));

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/tasks",
        component: () => <AuthGuard>{Tasks}</AuthGuard>,
      },
      {
        path: "/sign-in",
        component: Login,
      },
      {
        path: "/sign-up",
        component: Register,
      },
    ],
  },
  {
    path: "/*all",
    component: Error,
  },
] as RouteDefinition;

export default routes;
