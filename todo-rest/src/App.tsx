import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteTodos,
  useGetTodosQuery,
  usePostTodos,
} from "./hooks/requests";
import { useRef } from "react";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";

function App() {
  const queryClient = useQueryClient();
  const { mutate: postTodo, isSuccess: postSuccess } = usePostTodos();
  const { mutate: deleteTodo, isSuccess: deleteSuccess } = useDeleteTodos();
  const { data, status } = useGetTodosQuery();

  const formInput = useRef<HTMLInputElement>(null);
  const emptyString = useRef<HTMLElement>(null);

  postSuccess || deleteSuccess
    ? queryClient.invalidateQueries({ queryKey: ["todos"] })
    : "";

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const span = emptyString.current;
    const postContent = { content: formInput.current?.value };

    if (formInput.current?.value === "") {
      span!.textContent = "The field cannot be empty.";
      span!.classList.remove("hidden");
    } else {
      postTodo(postContent);
      span!.textContent = "";
      span!.classList.add("hidden");
    }
  };

  const handleDelete = (id: number) => {
    const postId = { id: id };
    deleteTodo(postId);
  };

  return (
    <main className="flex p-4 justify-center w-full flex-col items-center">
      {status === "pending" ? (
        <div>
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      ) : (
        <div className="w-[768px] flex flex-col h-min">
          <TodoForm
            handleSubmit={handleSubmit}
            content={formInput}
            emptyString={emptyString}
          />
          <div className="mt-4">
            <Todos data={data} handleDelete={handleDelete} />
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
