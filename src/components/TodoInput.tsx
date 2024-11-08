import { useCallback, useContext } from "react";
import { todoContexts } from "../contexts/Mycontext";
import { motion } from "framer-motion";
import { ButtonAnimations } from "../contexts/Mycontext";

const TodoInput = () => {
  const context = useContext(todoContexts);
  if (!context) {
    throw new Error(
      "The context is not set up properly, and the message comes from TodoInput.tsx. Go and check your context or App.tsx"
    );
  }

  const { makeTodo, input, setInput } = context;

  const createTodo = useCallback(() => {
    makeTodo(input);
    setInput("");
  }, [input, makeTodo, setInput]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo();
      }}
      className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full"
    >
      <input
        className="w-full sm:w-auto flex-grow p-3 rounded-md text-black bg-white border border-gray-300 shadow-sm placeholder-gray-500 focus:border-blue-800 focus:ring-1 focus:ring-blue-800"
        placeholder="Enter a todo"
        type="text"
        required
        autoFocus
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <motion.button
        variants={ButtonAnimations}
        whileTap="whileTab"
        className="w-full sm:w-auto px-4 py-2 rounded-md shadow-md hover:bg-blue-900 bg-blue-800 text-white"
      >
        Make new
      </motion.button>
    </form>
  );
};

export default TodoInput;
