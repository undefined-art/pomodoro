import { For, Suspense } from "solid-js";
import Task from "./task";
import { useRequest } from "../../../hooks/useRequest";
import { TaskType } from "../../../entities/task";

const TASKS_MOCK = [
  {
    id: 0,
    title: "Test task",
    description: "Task description",
    status: "active",
    created: "3 days ago", // TODO: Date format calculation
  },
  {
    id: 1,
    title: "Test task",
    description: "Task description",
    status: "active",
    created: "3 days ago", // TODO: Date format calculation
  },
  {
    id: 2,
    title: "Test task",
    description: "Task description",
    status: "active",
    created: "3 days ago", // TODO: Date format calculation
  },
];

const TaskList = () => {
  const { isPending, response } = useRequest<{ data: TaskType[] }>({
    url: "http://localhost:3000/api/v1/tasks",
    isFetch: true,
  });

  return (
    <ul class="m-auto gap-4 grid grid-cols-1 w-5/6 max-w-lg">
      {!isPending() ? (
        <For each={response()?.data}>{(task) => <Task task={task} />}</For>
      ) : (
        <div>Loading...</div>
      )}
    </ul>
  );
};

export default TaskList;
