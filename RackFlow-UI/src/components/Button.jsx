const Button = ({ content }) => {
  return (
    <button className="bg-white px-3 py-1 rounded-lg dark:bg-slate-500 dark:text-white shadow-md">
      <div className="text-blue-500 dark:text-white">{content}</div>
    </button>
  );
};

export default Button;
