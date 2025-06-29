import { type Component } from "solid-js";
import TasksList from "./components/tasks-list";
import Clock from "./components/clock";

const Tasks: Component = () => {
  return (
    <div class="min-h-screen bg-gray-50">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timer Section */}
        <div class="lg:col-span-1">
          <Clock />
        </div>

        {/* Tasks Section */}
        <div class="lg:col-span-2">
          <TasksList />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
