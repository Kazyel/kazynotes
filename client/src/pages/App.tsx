import { useGetTodos } from "../services/api/todosRequests";
import { useUserStore } from "../context/userContext";
import { Navigate } from "react-router-dom";
import TodoForm from "../components/todos/TodoForm";
import Todos from "../components/todos/Todos";

const App = () => {
  const { data } = useGetTodos();
  const { isLoggedIn } = useUserStore();

  return (
    <main className="flex h-screen w-full flex-col items-center bg-gradient-to-br from-primary-950 to-primary-900 p-4">
      {isLoggedIn ? (
        <div className="flex h-min w-[768px] flex-col px-4">
          <TodoForm />
          <div className="mt-4">
            <h2 className="mb-6 text-2xl font-semibold text-text-200">
              These are your todos:
            </h2>
            {data?.length === 0 ? (
              <div>
                <p className="text-text-100 font-thin text-lg">There is nothing, yet.</p>
              </div>
            ) : (
              <Todos data={data} />
            )}
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </main>
  );
};

export default App;
