type FormProps = {
  handleSubmit: (e: React.SyntheticEvent) => void;
  content: React.RefObject<HTMLInputElement>;
  emptyString: React.RefObject<HTMLElement>;
};

const TodoForm = ({ handleSubmit, content, emptyString }: FormProps) => {
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
        ref={content}
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
