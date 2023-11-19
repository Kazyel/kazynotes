import { Link } from "react-router-dom";
import { useCreateUser } from "../../hooks/userRequests";
import { useEffect } from "react";

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
              <label className="text-xl font-bold text-text-800">
                Username
              </label>
              <input
                required
                className="focus:outline-3 rounded bg-text-50 px-3 py-4 shadow placeholder:font-light placeholder:text-text-950/60 focus:outline focus:outline-1 focus:outline-offset-[-2px] focus:outline-text-800/75"
                name="username"
                type="text"
                placeholder="Enter your name..."
              />
            </div>
            <div className="mb-6 flex flex-col gap-1 ">
              <label className="text-xl font-bold text-text-800">Email</label>
              <input
                required
                className="focus:outline-3 rounded bg-text-50 px-3 py-4 shadow placeholder:font-light placeholder:text-text-950/60 focus:outline focus:outline-1 focus:outline-offset-[-2px] focus:outline-text-800/75"
                name="email"
                type="email"
                placeholder="Enter your email..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl font-bold text-text-800">
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                className="focus:outline-3 rounded bg-text-50 px-3 py-4 shadow placeholder:font-light placeholder:text-text-950/60 focus:outline focus:outline-1 focus:outline-offset-[-2px] focus:outline-text-800/75"
                placeholder="Enter your password..."
              />
            </div>
          </div>
          {isError ? (
            <div className="text-red-400 text-center text-lg font-semibold">{`${error.message}`}</div>
          ) : (
            ""
          )}
          <button className="rounded bg-gradient-to-r from-primary-300 to-primary-500  p-3 text-xl font-semibold text-text-50 transition-all duration-150 ease-in-out hover:from-primary-400 hover:to-primary-500">
            Create user
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
