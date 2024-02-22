import { For } from "solid-js";
import Task from "./task";

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
  return (
    <ul class="m-auto gap-4 grid grid-cols-1 w-5/6 max-w-lg">
      <For each={TASKS_MOCK}>{(task) => <Task task={task} />}</For>
    </ul>
  );
};

export default TaskList;
