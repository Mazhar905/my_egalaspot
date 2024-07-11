import react from "react";


const TextButton = ({ value }) => (
  <button
    type="button"
    className={`bg-red-500 hover:bg-red-600 text-white rounded-md px-5 py-3 inline-block no-underline`}
  >
    {value}
  </button>
);

export default TextButton;
