import { useUpdateTodos } from "../../services/api/todosRequests";

type ContentProps = {
  id: number;
  content: string;
  checked: boolean;
};

const TodoContext = ({ id, content, checked }: ContentProps) => {
  const { mutate } = useUpdateTodos();

  const handleCheck = (id: number) => {
    mutate({ id: id, checked: !checked });
  };

  return (
    <div className="flex justify-center gap-3" id={`${id}`}>
      <input
        type="checkbox"
        className="w-4"
        checked={checked}
        onChange={() => handleCheck(id)}
      />
      <p className={`text-lg font-semibold ${checked ? "line-through " : ""}`}>
        {content}
      </p>
    </div>
  );
};

export default TodoContext;
