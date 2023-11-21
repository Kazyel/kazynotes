import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCreateUser } from "../../services/api/userRequests";
import Input from "../../components/user/Input";
import Label from "../../components/user/Label";
import Button from "../../components/user/Button";

const Register = () => {
  const { mutate: createUser, isError, error } = useCreateUser();
  
  useEffect(() => {
    document.title = "To-do App | Register";
  }, []);

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    createUser(userData);
  };

  return (
    <div className="grid h-screen w-full place-items-center bg-gradient-to-tr from-background-950 to-background-900 bg-cover bg-no-repeat font-pathway">
      <form
        onSubmit={(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) =>
          handleSubmit(e)
        }
        className="flex h-[625px]  w-[425px] flex-col rounded-lg bg-gradient-to-b  from-primary-100 to-primary-200 p-8"
      >
        <div className="mb-6">
          <h1 className="bg-gradient-to-l from-background-900 to-background-700/90 bg-clip-text text-[3.5rem]  font-extrabold text-transparent ">
            REGISTER
          </h1>
          <h2 className="-mt-3  text-sm text-text-800/75 drop-shadow-[0px_0px_25px_#f3e5d755]">
            Already have an account?
            <Link
              to="/login"
              className="font-semibold text-text-800 underline-offset-2 hover:underline"
            >
              {" "}
              Sign in
            </Link>
          </h2>
        </div>
        <div className="flex h-full flex-col justify-between gap-4">
          <div>
            <div className="mb-6 flex flex-col gap-1">
              <Label htmlFor="username" text={"Username"} />
              <Input
                required={true}
                id="username"
                name="username"
                type="text"
                placeholder="Enter your name..."
              />
            </div>
            <div className="mb-6 flex flex-col gap-1 ">
              <Label htmlFor="email" text={"Email"} />
              <Input
                id="email"
                required={true}
                name="email"
                type="email"
                placeholder="Enter your email..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" text={"Password"} />
              <Input
                required={true}
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password..."
              />
            </div>
          </div>
          {isError ? (
            <div className="text-red-400 text-center text-lg font-semibold">{`${error.message}`}</div>
          ) : (
            ""
          )}
          <Button text="Create User" />
        </div>
      </form>
    </div>
  );
};

export default Register;
