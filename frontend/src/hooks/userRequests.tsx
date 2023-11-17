import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../context/userContext";

const userURL = "http://localhost:3000/user";

type loginData = {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => getUserInfo(),
  });
};

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigate("/login");
    },
  });
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUsername } = useUserStore();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables: loginData) => {
      setIsLoggedIn(true);
      setUsername(`${variables.username}`);
      navigate("/todos");
    },
    onError: (error) => {
      console.log(error);
      return;
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

const getUserInfo = async () => {
  const response = await axios.get(userURL);
  return response.data;
};

const createUser = async (user: object) => {
  return await axios.post(userURL + "/register", user).catch((err) => {
    if (err.response) {
      const error = err.response.data;
      throw new Error(error);
    }
  });
};

const loginUser = async (user: object) => {
  return await axios
    .post(userURL + "/login", { ...user, isLoggedIn: true })
    .catch((err) => {
      if (err.response) {
        const error = err.response.data;
        throw new Error(error);
      }
    });
};

const deleteUser = async (user: object) => {
  return await axios.delete(userURL, {
    headers: {
      "Content-Type": "application/json",
    },
    data: user,
  });
};
