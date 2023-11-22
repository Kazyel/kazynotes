import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../context/userContext";
import axios from "axios";

const todoURL = import.meta.env.VITE_ENDPOINT;

export const useGetTodos = () => {
  const { userId } = useUserStore();

  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => getTodos(userId),
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
  const { userId } = useUserStore();
  return useMutation({
    mutationFn: async (variables: object) => updateTodos(variables, userId),
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["todos"], data);
    },
  });
};

const getTodos = async (userId: number) => {
  const response = await axios.get(todoURL + `${userId}`);
  return response.data;
};

const postTodos = async (todo: object) => {
  return await axios.post(todoURL, todo);
};

// const updateTodos =
const updateTodos = async (todo: object, userId: number) => {
  return await axios.patch(todoURL + `${userId}`, todo);
};

const deleteTodos = async (todo: object) => {
  return await axios.delete(todoURL, {
    headers: {
      "Content-Type": "application/json",
    },
    data: todo,
  });
};
