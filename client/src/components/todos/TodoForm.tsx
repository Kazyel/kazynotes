import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../context/userContext";
import { usePostTodos } from "../../services/api/todosRequests";

const TodoForm = () => {
  const { mutate: postTodo } = usePostTodos();
  const { setIsLoggedIn, setUsername, userId, username } = useUserStore();
  const navigate = useNavigate();
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
    } else {
      span!.textContent = "";
      postTodo(postContent);
    }
  };

  const handleClick = () => {
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <form className="flex flex-col gap-3 py-6" onSubmit={handleSubmit}>
      <div className="flex w-full items-center justify-between">
        <label
          htmlFor="todo-content"
          className="text-lg font-medium text-text-100"
        >
          <span className="font-bold text-text-200">User:</span>{" "}
          {`${username.charAt(0).toUpperCase() + username.slice(1)}`}
        </label>
        <div
          className="cursor-pointer rounded bg-secondary-300 px-3 py-2 font-semibold text-text-100 transition-all duration-150 ease-in-out hover:bg-secondary-400"
          onClick={handleClick}
        >
          Logout
        </div>
      </div>
      <input
        id="todo-content"
        className="focus:outline-3 rounded bg-text-50 px-4 py-5 shadow placeholder:text-text-950/60 focus:outline focus:outline-1 focus:outline-offset-[-2px] focus:outline-text-800/75"
        ref={formInput}
        placeholder="Enter what you need to do..."
        maxLength={50}
      ></input>
      <div className="flex w-full items-center justify-between">
        <span ref={emptyString} className="font-semibold text-text-200"></span>
        <button className="mt-2 w-1/4 rounded bg-secondary-400 p-2 font-semibold text-text-100 transition-all duration-300 ease-in-out hover:bg-secondary-300">
          Post
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
