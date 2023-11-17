import { useRef } from "react";
import { usePostTodos } from "../hooks/requests";

const TodoForm = () => {
  const { mutate: postTodo } = usePostTodos();
  const formInput = useRef<HTMLInputElement>(null);
  const emptyString = useRef<HTMLElement>(null);

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

  return (
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
        ref={formInput}
        placeholder="Enter what you need to do..."
      ></input>
      <button className="p-2 text-white bg-blue-500 mt-2 rounded-sm hover:bg-blue-400 duration-300 ease-in-out transition-all">
        Post
      </button>
      <span
        ref={emptyString}
        className="hidden font-semibold text-red-500"
      ></span>
    </form>
  );
};

export default TodoForm;
