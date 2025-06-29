import { type Component, createSignal, Show } from "solid-js";
import { type SubmitHandler, createForm } from "@modular-forms/solid";
import { useNavigate, A } from "@solidjs/router";
import { useRequest } from "../../hooks/useRequest";
import { useAppState } from "../../context";

interface LoginFormType {
  email: string;
  password: string;
  [key: string]: any; // Add index signature for FieldValues constraint
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const Login: Component = () => {
  const navigate = useNavigate();
  const { setAuth } = useAppState();
  const [loginError, setLoginError] = createSignal<string>("");

  const { request, isPending } = useRequest<LoginFormType>({
    url: `${
      import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1"
    }/auth/local/login`,
    method: "POST",
    onFinalize: (response: LoginResponse) => {
      // Store tokens
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);

      // Update auth state
      setAuth({
        username: response.user.username,
        avatar_url: "",
        is_authenticated: true,
      });

      // Redirect to tasks page
      navigate("/tasks", { replace: true });
    },
  });

  const [loginForm, { Form, Field }] = createForm<LoginFormType>();

  const handleSubmit: SubmitHandler<LoginFormType> = async (
    form: LoginFormType
  ) => {
    try {
      setLoginError("");
      await request(form);
    } catch (error: any) {
      setLoginError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div class="flex flex-grow items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 min-h-[calc(100vh-64px)]">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Welcome to Tempo</h1>
          <p class="text-purple-200">
            Sign in to start your productive journey
          </p>
        </div>

        <Form
          class="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8"
          onSubmit={handleSubmit}
        >
          <Show when={loginError()}>
            <div class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {loginError()}
            </div>
          </Show>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <Field name="email">
              {(field, props) => (
                <input
                  {...props}
                  type="email"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              )}
            </Field>
          </div>

          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <Field name="password">
              {(field, props) => (
                <input
                  {...props}
                  type="password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              )}
            </Field>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              type="submit"
              disabled={isPending()}
            >
              {isPending() ? "Signing in..." : "Sign In"}
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-purple-600 hover:text-purple-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </Form>

        <div class="text-center mt-6">
          <p class="text-purple-200 text-sm">
            Don't have an account?{" "}
            <A
              href="/sign-up"
              class="text-white hover:text-purple-200 font-semibold"
            >
              Sign up
            </A>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
