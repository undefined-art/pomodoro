import { For, Suspense, createSignal } from "solid-js";
import Task from "./task";
import TaskForm from "./task-form";
import { useRequest } from "../../../hooks/useRequest";
import { TaskType } from "../../../entities/task";

const TasksList = () => {
  const [refreshKey, setRefreshKey] = createSignal(0);

  const { isPending, response, error } = useRequest<{ data: TaskType[] }>({
    url: `${
      import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1"
    }/tasks`,
    isFetch: true,
  });

  const handleTaskCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
        <p class="text-gray-600">
          Manage your tasks and track your productivity
        </p>
      </div>

      <TaskForm onSuccess={handleTaskCreated} />

      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Task List</h2>
        </div>

        <div class="p-6">
          <Suspense
            fallback={<div class="text-center py-8">Loading tasks...</div>}
          >
            {error() ? (
              <div class="text-center py-8">
                <div class="text-red-600 mb-2">Error loading tasks</div>
                <button
                  onClick={() => setRefreshKey((prev) => prev + 1)}
                  class="text-blue-600 hover:text-blue-800"
                >
                  Try again
                </button>
              </div>
            ) : isPending() ? (
              <div class="text-center py-8">Loading tasks...</div>
            ) : response()?.data && response()!.data.length > 0 ? (
              <div class="space-y-4">
                <For each={response()!.data}>
                  {(task) => <Task task={task} />}
                </For>
              </div>
            ) : (
              <div class="text-center py-8 text-gray-500">
                <div class="text-lg mb-2">No tasks yet</div>
                <p>Create your first task to get started!</p>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default TasksList;
