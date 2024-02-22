import { type Component } from "solid-js";
import TasksList from "./components/tasks-list";
import Clock from "./components/clock";

const Tasks: Component = () => {
  return (
    <div>
      <Clock />
      <TasksList />
    </div>
  );
};

export default Tasks;
