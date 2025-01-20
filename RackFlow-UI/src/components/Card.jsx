const Card = ({title,content}) => {
  return (
    <a
      href="#"
      class="block min-w-60 p-6 bg-white border border-gray-200 rounded-lg shadow-lg  dark:bg-gray-800 dark:border-gray-700"
    >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-blue-500 dark:text-white">
        {title}
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        {content}
      </p>
    </a>
  );
};

export default Card;
