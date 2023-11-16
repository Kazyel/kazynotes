import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetTodosQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => getTodos(),
  });
};

export const usePostTodos = () => {
  return useMutation({ mutationFn: postTodos });
};

export const useDeleteTodos = () => {
  return useMutation({ mutationFn: deleteTodos });
};

const getTodos = async () => {
  const response = await axios.get("http://localhost:3000/todos");
  return response.data;
};

const postTodos = (todo: object) => {
  return axios.post("http://localhost:3000/todos", todo);
};

const deleteTodos = (todo: object) => {
  return axios.delete("http://localhost:3000/todos", {
    headers: {
      "Content-Type": "application/json",
    },
    data: todo,
  });
};
