import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../context/userContext";

const userURL = "http://localhost:3000/user/";

type loginData = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
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
  const { setIsLoggedIn, setUsername, setUserId } = useUserStore();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (data, variables: loginData) => {
      const { id, username } = await getUserInfo(variables.email);
      setIsLoggedIn(true);
      setUsername(`${username}`);
      setUserId(id);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      return;
    },
  });
};

const getUserInfo = async (email: FormDataEntryValue | null) => {
  const response = await axios.get(userURL + `${email}`);
  return response.data;
};

const createUser = async (user: object) => {
  return await axios.post(userURL + "register", user).catch((err) => {
    if (err.response) {
      const error = err.response.data;
      throw new Error(error);
    }
  });
};

const loginUser = async (user: object) => {
  return await axios.post(userURL + "login", user).catch((err) => {
    if (err.response) {
      const error = err.response.data;
      throw new Error(error);
    }
  });
};

// export const useDeleteUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["user"] });
//     },
//   });
// };

// const deleteUser = async (user: object) => {
//   return await axios.delete(userURL, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: user,
//   });
// };
