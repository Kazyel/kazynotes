type InputProps = {
  required: boolean;
  name: string;
  type: string;
  placeholder: string;
  id: string;
};

const Input = ({ id, required, name, type, placeholder }: InputProps) => {
  return (
    <input
      required={required}
      id={id}
      className="focus:outline-3 rounded bg-text-50 px-3 py-4 shadow placeholder:font-light placeholder:text-text-950/60 focus:outline focus:outline-1 focus:outline-offset-[-2px] focus:outline-text-800/75"
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
