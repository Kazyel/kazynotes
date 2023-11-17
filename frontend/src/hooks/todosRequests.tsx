import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const todoURL = "http://localhost:3000/todos";

export const useGetTodos = () => {
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

export const useUpdateTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodos,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["todos"], data);
    },
  });
};

const getTodos = async () => {
  const response = await axios.get(todoURL);
  return response.data;
};

const postTodos = async (todo: object) => {
  return await axios.post(todoURL, todo);
};

// const updateTodos =
const updateTodos = async (todo: object) => {
  return await axios.patch(todoURL, todo);
};

const deleteTodos = async (todo: object) => {
  return await axios.delete(todoURL, {
    headers: {
      "Content-Type": "application/json",
    },
    data: todo,
  });
};
