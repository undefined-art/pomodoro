const Todo = ({ task }: any) => {
  const { title, description, created, status } = task || {};

  return (
    <li class="px-4 py-5 sm:px-6 bg-white shadow overflow-hidden sm:rounded-md hover:bg-gray-50 cursor-pointer">
      <div class="flex items-center justify-between">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Created: <span class="text-green-600">{created}</span>
        </p>
      </div>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Status: <span class="text-green-600">{status}</span>
      </p>
      <div class="mt-4 flex items-center justify-between">
        <p class="text-sm font-medium text-gray-500">{description}</p>
      </div>
    </li>
  );
};

export default Todo;
