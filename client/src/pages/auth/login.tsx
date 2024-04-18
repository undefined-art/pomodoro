import { type Component } from 'solid-js';

import { type SubmitHandler, createForm } from '@modular-forms/solid';
import { useRequest } from '../../hooks/useRequest';
import { useAuthContext } from '../../context/auth';

interface LoginFormType {
  email: string;
  password: string;
}

const Login: Component = () => {
  const { setUser } = useAuthContext();
  const { request } = useRequest({
    url: 'http://localhost:3001/api/v1/auth/local/login',
    method: 'POST',
    onFinalize: (user) => setUser(user),
  });

  const [loginForm, { Form, Field }] = createForm<LoginFormType>();

  const handleSubmit: SubmitHandler<LoginFormType> = async (
    form: LoginFormType
  ) => {
    await request(form);
  };

  return (
    <div class="flex flex-grow items-center justify-center bg-gray-800 min-h-[calc(100vh-64px)]">
      <div class="w-full max-w-xs">
        <Form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <Field name="email">
              {(_, props) => (
                <input
                  {...props}
                  type="email"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  placeholder="Enter email"
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
              {(_, props) => (
                <input
                  {...props}
                  type="password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  placeholder="Enter password"
                />
              )}
            </Field>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loginForm.submitting ? 'Loading...' : 'Sign In'}
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
