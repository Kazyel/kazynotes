import { useRef } from "react";
import { useUpdateTodos } from "../hooks/requests";

type ContentProps = {
  id: number;
  content: string;
  checked: boolean;
};

const TodoContext = ({ id, content, checked }: ContentProps) => {
  const ref = useRef<HTMLInputElement>(null);
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
        ref={ref}
      />
      <p className={`font-semibold text-lg ${checked ? "line-through " : ""}`}>
        {content}
      </p>
    </div>
  );
};

export default TodoContext;
