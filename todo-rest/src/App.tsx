import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteTodos,
  useGetTodosQuery,
  usePostTodos,
} from "./hooks/requests";
import { useRef } from "react";

type Query = {
  id: number;
  content: string;
};

function App() {
  const queryClient = useQueryClient();
  const { mutate: postTodo, isSuccess: postSuccess } = usePostTodos();
  const { mutate: deleteTodo, isSuccess: deleteSuccess } = useDeleteTodos();
  const { data, status } = useGetTodosQuery();
  const content = useRef<HTMLInputElement>(null);

  postSuccess || deleteSuccess
    ? queryClient.invalidateQueries({ queryKey: ["todos"] })
    : "";

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const postContent = { content: content.current?.value };
    postTodo(postContent);
  };

  const handleDelete = (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();
    const postId = { id: id };
    deleteTodo(postId);
  };

  // If mutation is successful, invalidate and refetch

  return (
    <main className="flex p-4 justify-center w-full flex-col items-center">
      {status === "pending" ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="w-[768px] flex flex-col h-min">
          <form
            className="flex border rounded-md flex-col gap-3 py-6 px-4"
            onSubmit={handleSubmit}
          >
            <label htmlFor="todo-content" className="font-semibold text-lg">
              Kazyel's Todos
            </label>
            <input
              id="todo-content"
              className="border p-2"
              ref={content}
              placeholder="Enter what you need to do..."
            ></input>
            <button className="p-2 text-white bg-blue-500 mt-2 rounded-sm hover:bg-blue-400 duration-300 ease-in-out transition-all">
              Post
            </button>
          </form>
          <div className="mt-4">
            {data.map((todo: Query) => (
              <div className="flex justify-between w-full items-center border gap-4 mt-2 rounded-md px-4 py-6">
                <p className="" key={todo.id}>
                  {todo.content}
                </p>
                <svg
                  onClick={(e) => handleDelete(e, todo.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 cursor-pointer stroke-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
