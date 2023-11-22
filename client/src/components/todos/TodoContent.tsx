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
    <div className="flex justify-center items-center gap-3" id={`${id}`}>
      <div className="checkbox-wrapper-2 flex">
        <input
          type="checkbox"
          className="sc-gJwTLC ikxBAC w-4"
          checked={checked}
          onChange={() => handleCheck(id)}
        />
        
      </div>
      <p
        className={`text-lg font-semibold text-text-900 ${
          checked ? "line-through " : ""
        }`}
      >
        {content}
      </p>
    </div>
  );
};

export default TodoContext;
