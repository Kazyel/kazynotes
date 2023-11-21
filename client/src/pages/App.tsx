import { useGetTodos } from "../services/api/todosRequests";
import { useUserStore } from "../context/userContext";
import { Navigate } from "react-router-dom";
import TodoForm from "../components/todos/TodoForm";
import Todos from "../components/todos/Todos";

const App = () => {
  const { data } = useGetTodos();
  const { isLoggedIn } = useUserStore();

  return (
    <main className="flex w-full flex-col items-center justify-center p-4">
      {isLoggedIn ? (
        <div className="flex h-min w-[768px] flex-col">
          <p className="text-black"></p>
          <TodoForm />
          <div className="mt-4">
            <Todos data={data} />
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </main>
  );
};

export default App;
