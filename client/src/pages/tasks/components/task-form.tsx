import { Component, createSignal, Show } from "solid-js";
import { createForm } from "@modular-forms/solid";
import { useRequest } from "../../../hooks/useRequest";
import { useAppState } from "../../../context";

interface TaskFormData {
  title: string;
  description?: string;
  pomodoro: number;
  projectId?: number;
  [key: string]: any; // Add index signature for FieldValues constraint
}

interface TaskFormProps {
  onSuccess?: () => void;
  initialData?: Partial<TaskFormData>;
  mode?: "create" | "edit";
}

const TaskForm: Component<TaskFormProps> = (props) => {
  const { auth } = useAppState();
  const [isOpen, setIsOpen] = createSignal(false);

  const { request, isPending } = useRequest({
    url: `${
      import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1"
    }/tasks`,
    method: "POST",
    onFinalize: () => {
      setIsOpen(false);
      props.onSuccess?.();
    },
  });

  const [taskForm, { Form, Field }] = createForm<TaskFormData>({
    initialValues: {
      title: props.initialData?.title || "",
      description: props.initialData?.description || "",
      pomodoro: props.initialData?.pomodoro || 1,
      projectId: props.initialData?.projectId,
    },
  });

  const handleSubmit = async (data: TaskFormData) => {
    await request({
      ...data,
      createdBy: 1, // Fallback for demo - in production this would come from auth
    });
  };

  return (
    <div class="mb-6">
      <Show when={!isOpen()}>
        <button
          onClick={() => setIsOpen(true)}
          class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          + Add New Task
        </button>
      </Show>

      <Show when={isOpen()}>
        <div class="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {props.mode === "edit" ? "Edit Task" : "Create New Task"}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              class="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <Form onSubmit={handleSubmit} class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <Field name="title">
                {(field, props) => (
                  <input
                    {...props}
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter task title"
                    required
                  />
                )}
              </Field>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Field name="description">
                {(field, props) => (
                  <textarea
                    {...props}
                    rows={3}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter task description (optional)"
                  />
                )}
              </Field>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Estimated Pomodoros
              </label>
              <Field name="pomodoro" type="number">
                {(field, props) => (
                  <input
                    {...props}
                    min="1"
                    max="10"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="1"
                  />
                )}
              </Field>
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isPending()}
                class="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                {isPending() ? "Creating..." : "Create Task"}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </Show>
    </div>
  );
};

export default TaskForm;
