import { Link } from "react-router-dom";
import { useLoginUser } from "../../hooks/userRequests";
import { useEffect } from "react";

const Login = () => {
  const { mutate: login, isError, error } = useLoginUser();

  useEffect(() => {
    document.title = "To-dos App | Login";
  }, []);

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    login(userData);
  };

  return (
    <div className="grid h-screen w-full place-items-center bg-gradient-to-tr from-background-950 to-background-900 bg-cover bg-no-repeat font-pathway">
      <form
        onSubmit={(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) =>
          handleSubmit(e)
        }
        className="flex h-[625px]  w-[425px] flex-col rounded-lg bg-gradient-to-b  from-primary-100 to-primary-200 p-8"
      >
        <div className="mb-16">
          <h1 className="bg-gradient-to-l from-background-900 to-background-700/90 bg-clip-text text-[5rem]  font-extrabold text-transparent">
            LOGIN
          </h1>
          <h2 className="-mt-5 text-lg text-text-800/75">
            or create a{" "}
            <Link
              to="/register"
              className="font-semibold text-text-800 underline-offset-2 hover:underline"
            >
              new account
            </Link>
          </h2>
        </div>
        <div className="flex h-full flex-col justify-between gap-4">
          <div>
            <div className="mb-6 flex flex-col gap-1">
              <label className="text-xl font-bold text-text-800">Email</label>
              <input
                required
                className="focus:outline-3 rounded bg-text-50 px-3 py-4 shadow placeholder:font-light placeholder:text-text-950/60 focus:outline focus:outline-1 focus:outline-offset-[-2px] focus:outline-text-800/75"
                name="email"
                type="email"
                placeholder="Enter your name..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xl font-semibold text-text-800">
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
            <div className="text-center text-xl font-semibold  text-text-800">{`${error.message}`}</div>
          ) : (
            ""
          )}
          <button className="rounded bg-gradient-to-r from-primary-300 to-primary-500 p-3  text-xl font-semibold text-text-50 shadow transition-all duration-150 ease-in-out hover:from-primary-400 hover:to-primary-500 ">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
