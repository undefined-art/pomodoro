import Todo from "./todo";

const TODOS_MOCK = [
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

const TodoList = () => {
  return (
    <ul class="max-w-sm mx-auto gap-4 grid grid-cols-1">
      {TODOS_MOCK.map((task) => (
        <Todo task={task} />
      ))}
    </ul>
  );
};

export default TodoList;
