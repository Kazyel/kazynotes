type LabelProps = {
  text: string;
  htmlFor: string;
};

const Label = ({ text, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="text-xl font-bold text-text-800">
      {text}
    </label>
  );
};

export default Label;
