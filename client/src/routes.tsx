import { lazy } from "solid-js";
import AuthGuard from "./guards/AuthGuard";

const routes = [
  {
    path: "/",
    component: lazy(() => import("./layout")),
    children: [
      {
        path: "/",
        component: lazy(() => import("./pages/home")),
      },
      {
        path: "/tasks",
        component: () => (
          <AuthGuard>{lazy(() => import("./pages/tasks"))}</AuthGuard>
        ),
      },
    ],
  },
  {
    path: "/*all",
    component: lazy(() => import("./pages/error")),
  },
];

export default routes;
