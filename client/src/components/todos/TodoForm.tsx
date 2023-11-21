import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../context/userContext";
import { usePostTodos } from "../../services/api/todosRequests";

const TodoForm = () => {
  const { username } = useUserStore();
  const { mutate: postTodo } = usePostTodos();
  const navigate = useNavigate();
  const { setIsLoggedIn, setUsername, userId } = useUserStore();
  const formInput = useRef<HTMLInputElement>(null);
  const emptyString = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const span = emptyString.current;
    const postContent = {
      content: formInput.current?.value,
      UserId: userId,
    };

    if (formInput.current?.value === "") {
      span!.textContent = "The field cannot be empty.";
      span!.classList.remove("hidden");
    } else {
      span!.textContent = "";
      span!.classList.add("hidden");
      postTodo(postContent);
    }
  };

  const handleClick = () => {
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <form
      className="flex flex-col gap-3 rounded-md border px-4 py-6"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full items-center justify-between">
        <label htmlFor="todo-content" className="text-lg font-semibold">
          {`${username}`} To-dos
        </label>
        <div
          className="bg-red-400 hover:bg-red-300 text-white cursor-pointer rounded p-2 font-semibold transition-all duration-150 ease-in-out"
          onClick={handleClick}
        >
          Logout
        </div>
      </div>
      <input
        id="todo-content"
        className="border p-2"
        ref={formInput}
        placeholder="Enter what you need to do..."
      ></input>
      <button className="text-white bg-blue-500 hover:bg-blue-400 mt-2 rounded-sm p-2 transition-all duration-300 ease-in-out">
        Post
      </button>
      <span
        ref={emptyString}
        className="text-red-500 hidden font-semibold"
      ></span>
    </form>
  );
};

export default TodoForm;
