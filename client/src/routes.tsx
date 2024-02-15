import { Route, Router } from "@solidjs/router";
import Layout from "./layout";
import { lazy } from "solid-js";

const Home = lazy(() => import("./pages/home"));
const Todos = lazy(() => import("./pages/todos"));

const AppRoutes = () => (
  <Router>
    <Route component={Layout}>
      <Route path="/" component={Home} />
      <Route path="/todos" component={Todos} />
    </Route>
  </Router>
);

export default AppRoutes;
