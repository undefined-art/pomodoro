import { useNavigate } from "@solidjs/router";
import { Component, Suspense, createEffect } from "solid-js";

interface Props {
  children: Component & { preload: () => Promise<{ default: Component }> };
}

const AuthGuard = (props: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  createEffect(() => {
    if (!token) {
      navigate("/sign-in", { replace: true });
    }
  });

  const Child = props.children;

  return (
    <Suspense fallback={"Loading..."}>
      <Child />
    </Suspense>
  );
};

export default AuthGuard;
