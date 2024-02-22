import { lazy } from "solid-js";

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
        component: lazy(() => import("./pages/tasks")),
      },
    ],
  },
  {
    path: "/*all",
    component: lazy(() => import("./pages/error")),
  },
];

export default routes;
