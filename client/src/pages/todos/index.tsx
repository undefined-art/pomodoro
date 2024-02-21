import { type Component } from "solid-js";
import TodoList from "./components/todo-list";

const Todos: Component = () => {
  return (
    <div>
      <TodoList />
    </div>
  );
};

export default Todos;
