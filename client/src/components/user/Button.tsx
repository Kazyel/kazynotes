type ButtonProps = {
  text: string;
};

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="rounded bg-gradient-to-r from-primary-300 to-primary-500  p-3 text-xl font-semibold text-text-50 transition-all duration-150 ease-in-out hover:from-primary-400 hover:to-primary-500">
      {text}
    </button>
  );
};

export default Button;
