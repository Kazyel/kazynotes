import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetTodosQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => getTodos(),
  });
};

export const usePostTodos = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: postTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
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
