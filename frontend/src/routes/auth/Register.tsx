import { useCreateUser } from "../../hooks/userRequests";

const Register = () => {
  const { mutate: createUser, isError, error } = useCreateUser();
  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
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
    <div className="w-full h-screen grid place-items-center bg-[url(/bg.svg)] bg-cover bg-no-repeat">
      <form
        onSubmit={(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) =>
          handleSubmit(e)
        }
        className="border rounded-md border-stone-500/50 flex flex-col justify-between h-[500px] w-[350px] p-8"
      >
        <h1 className="text-4xl font-mono text-white text-center font-extrabold">
          Register
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-white text-lg font-semibold">Username</label>
            <input
              required
              className="rounded px-2 py-1"
              name="username"
              type="text"
              placeholder="Enter your name..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white text-lg font-semibold">Email</label>
            <input
              required
              className="rounded px-2 py-1"
              name="email"
              type="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white text-lg font-semibold">Password</label>
            <input
              required
              type="password"
              name="password"
              className="rounded px-2 py-1"
              placeholder="Enter your password..."
            />
          </div>
        </div>
        {isError ? (
          <div className="text-center font-semibold text-red-400 text-lg">{`${error.message}`}</div>
        ) : (
          ""
        )}
        <button className="p-4 bg-stone-500  text-white hover:bg-stone-500/50 duration-150 transition-all ease-in-out font-semibold text-xl font-mono">
          Create user
        </button>
      </form>
    </div>
  );
};

export default Register;
