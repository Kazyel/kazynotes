import { useUpdateTodos } from "../../hooks/todosRequests";

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
    <div className="flex gap-3 justify-center" id={`${id}`}>
      <input
        type="checkbox"
        className="w-4"
        checked={checked}
        onChange={() => handleCheck(id)}
      />
      <p className={`font-semibold text-lg ${checked ? "line-through " : ""}`}>
        {content}
      </p>
    </div>
  );
};

export default TodoContext;
