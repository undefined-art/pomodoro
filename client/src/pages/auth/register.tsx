import { type Component, createSignal, Show } from "solid-js";
import { type SubmitHandler, createForm } from "@modular-forms/solid";
import { useNavigate, A } from "@solidjs/router";
import { useRequest } from "../../hooks/useRequest";
import { useAppState } from "../../context";

interface RegisterFormType {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  [key: string]: any; // Add index signature for FieldValues constraint
}

interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const Register: Component = () => {
  const navigate = useNavigate();
  const { setAuth } = useAppState();
  const [registerError, setRegisterError] = createSignal<string>("");
  const [isSuccess, setIsSuccess] = createSignal(false);

  const { request, isPending } = useRequest<RegisterFormType>({
    url: `${
      import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1"
    }/auth/local/register`,
    method: "POST",
    onFinalize: (response: RegisterResponse) => {
      // Store tokens
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);

      // Update auth state
      setAuth({
        username: response.user.username,
        avatar_url: "",
        is_authenticated: true,
      });

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/tasks", { replace: true });
      }, 2000);
    },
  });

  const [registerForm, { Form, Field }] = createForm<RegisterFormType>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const validateForm = (form: RegisterFormType): string | null => {
    // Username validation
    if (form.username.length < 3) {
      return "Username must be at least 3 characters long";
    }

    if (form.username.length > 20) {
      return "Username must be less than 20 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Please enter a valid email address";
    }

    // Password validation
    if (form.password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit: SubmitHandler<RegisterFormType> = async (
    form: RegisterFormType
  ) => {
    try {
      setRegisterError("");

      // Client-side validation
      const validationError = validateForm(form);
      if (validationError) {
        setRegisterError(validationError);
        return;
      }

      // Remove confirmPassword from the request
      const { confirmPassword, ...registerData } = form;
      await request(registerData);
    } catch (error: any) {
      setRegisterError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div class="flex flex-grow items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 min-h-[calc(100vh-64px)]">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Join Tempo</h1>
          <p class="text-purple-200">
            Create your account to start your productive journey
          </p>
        </div>

        <Show when={isSuccess()}>
          <div class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Registration successful! Redirecting to tasks...
          </div>
        </Show>

        <Form
          class="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8"
          onSubmit={handleSubmit}
        >
          <Show when={registerError()}>
            <div class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {registerError()}
            </div>
          </Show>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <Field name="username">
              {(field, props) => (
                <input
                  {...props}
                  type="text"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  id="username"
                  placeholder="Enter your username"
                  minlength="3"
                  maxlength="20"
                  required
                />
              )}
            </Field>
            <p class="text-xs text-gray-500 mt-1">3-20 characters</p>
          </div>

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

          <div class="mb-4">
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
                  minlength="6"
                  required
                />
              )}
            </Field>
            <p class="text-xs text-gray-500 mt-1">At least 6 characters</p>
          </div>

          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="confirmPassword"
            >
              Confirm Password
            </label>
            <Field name="confirmPassword">
              {(field, props) => (
                <input
                  {...props}
                  type="password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  id="confirmPassword"
                  placeholder="Confirm your password"
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
              {isPending() ? "Creating Account..." : "Create Account"}
            </button>
            <A
              class="inline-block align-baseline font-bold text-sm text-purple-600 hover:text-purple-800"
              href="/sign-in"
            >
              Already have an account?
            </A>
          </div>
        </Form>

        <div class="text-center mt-6">
          <p class="text-purple-200 text-sm">
            By creating an account, you agree to our{" "}
            <a href="#" class="text-white hover:text-purple-200 font-semibold">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" class="text-white hover:text-purple-200 font-semibold">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
