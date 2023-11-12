import { useQuery } from "@tanstack/react-query";

type Query = {
  id: number;
  content: string;
};

const getTodos = async () => {
  const response = await fetch("http://localhost:3000/todos");
  return response.json()
};

function App() {
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => getTodos(),
  });

  return todoQuery.status === "pending" ? (
    <div>Loading...</div>
  ) : todoQuery.status === "error" ? (
    <div>Error</div>
  ) : (
    <div>
      {todoQuery.data?.map((todo: Query) => (
        <p>{todo.content}</p>
      ))}
      <p>Working...</p>
    </div>
  );
}

export default App;
