import { Component, createSignal, Show } from "solid-js";
import moment from "moment";
import { TaskType } from "../../../entities/task";
import { useRequest } from "../../../hooks/useRequest";

interface TaskProps {
  task: TaskType;
}

const Task: Component<TaskProps> = ({ task }) => {
  const [isExpanded, setIsExpanded] = createSignal(false);

  const { request: updateTask, isPending: isUpdating } = useRequest({
    url: `${
      import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1"
    }/tasks/${task.id}`,
    method: "PATCH",
  });

  const toggleCompletion = async () => {
    await updateTask({
      completed: !task.completed,
    });
  };

  const getStatusColor = () => {
    if (task.completed) return "bg-green-100 text-green-800";
    if (task.draft) return "bg-gray-100 text-gray-800";
    return "bg-blue-100 text-blue-800";
  };

  const getStatusText = () => {
    if (task.completed) return "Completed";
    if (task.draft) return "Draft";
    return "Active";
  };

  return (
    <div class="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div class="p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <button
                onClick={toggleCompletion}
                disabled={isUpdating()}
                class={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-300 hover:border-green-400"
                }`}
              >
                {task.completed && "✓"}
              </button>

              <h3
                class={`text-lg font-medium ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {task.title}
              </h3>

              <span
                class={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}
              >
                {getStatusText()}
              </span>
            </div>

            {task.project && (
              <div class="text-sm text-gray-600 mb-2">
                Project: <span class="font-medium">{task.project.title}</span>
              </div>
            )}

            <div class="flex items-center gap-4 text-sm text-gray-500">
              <div class="flex items-center gap-1">
                <span>🍅</span>
                <span>
                  {task.pomodoro} pomodoro{task.pomodoro !== 1 ? "s" : ""}
                </span>
              </div>

              <div class="flex items-center gap-1">
                <span>📊</span>
                <span>
                  {task.sessions || 0} session{task.sessions !== 1 ? "s" : ""}{" "}
                  completed
                </span>
              </div>

              <div class="flex items-center gap-1">
                <span>📅</span>
                <span>Created {moment(task.createdAt).fromNow()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded())}
            class="text-gray-400 hover:text-gray-600 p-1"
          >
            {isExpanded() ? "▼" : "▶"}
          </button>
        </div>

        {/* Expanded Details */}
        <Show when={isExpanded()}>
          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 class="font-medium text-gray-900 mb-2">Details</h4>
                <div class="space-y-1 text-gray-600">
                  <div>ID: {task.id}</div>
                  <div>
                    Created: {moment(task.createdAt).format("MMMM D, YYYY")}
                  </div>
                  <div>
                    Updated: {moment(task.updatedAt).format("MMMM D, YYYY")}
                  </div>
                  {task.expiredAt && (
                    <div>
                      Expires: {moment(task.expiredAt).format("MMMM D, YYYY")}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 class="font-medium text-gray-900 mb-2">Progress</h4>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Pomodoros</span>
                    <span>
                      {task.sessions || 0} / {task.pomodoro}
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={`width: ${Math.min(
                        ((task.sessions || 0) / task.pomodoro) * 100,
                        100
                      )}%`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Task;
