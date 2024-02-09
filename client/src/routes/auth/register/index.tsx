import type { QRL } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RegisterFormType } from "./types";
import type { SubmitHandler } from "@modular-forms/qwik";
import {
  useForm,
  type InitialValues,
  formAction$,
  valiForm$,
} from "@modular-forms/qwik";
import { RegisterSchema } from "./schema";

export const useFormAction = formAction$<RegisterFormType>(
  (values) => {},
  valiForm$(RegisterSchema)
);

export default component$(() => {
  const [RegisterForm, { Form, Field }] = useForm<RegisterFormType>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(RegisterSchema),
  });

  const handleSubmit: QRL<SubmitHandler<RegisterFormType>> = $(
    (values, event) => {
      console.log(values);
    }
  );

  return (
    <div class="grid h-full place-items-center">
      <div class="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Form class="max-w-sm mx-auto" onSubmit$={handleSubmit}>
          <div class="mb-5">
            <Field name="username">
              {(field, props) => (
                <div>
                  <input
                    {...props}
                    type="text"
                    value={field.value}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
          </div>
          <div class="mb-5">
            <Field name="email">
              {(field, props) => (
                <div>
                  <input
                    {...props}
                    type="email"
                    value={field.value}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
          </div>
          <div class="mb-5">
            <Field name="password">
              {(field, props) => (
                <div>
                  <input
                    {...props}
                    type="password"
                    value={field.value}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
});

export const useFormLoader = routeLoader$<InitialValues<RegisterFormType>>(
  () => ({
    username: "",
    email: "",
    password: "",
  })
);
