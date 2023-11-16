import { useGetTodosQuery } from "./hooks/requests";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";

function App() {
  const { data, status } = useGetTodosQuery();

  return (
    <main className="flex p-4 justify-center w-full flex-col items-center">
      {status === "pending" ? (
        <div>
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      ) : (
        <div className="w-[768px] flex flex-col h-min">
          <TodoForm />
          <div className="mt-4">
            <Todos data={data} />
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
