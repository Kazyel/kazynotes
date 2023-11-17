import { useGetTodos } from "../hooks/todosRequests";
import TodoForm from "../components/Todos/TodoForm";
import Todos from "../components/Todos/Todos";
import { useUserStore } from "../context/userContext";
import { Navigate } from "react-router-dom";

const App = () => {
  const { data } = useGetTodos();
  const { isLoggedIn } = useUserStore();

  return (
    <main className="flex p-4 justify-center w-full flex-col items-center">
      {isLoggedIn ? (
        <div className="w-[768px] flex flex-col h-min">
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
