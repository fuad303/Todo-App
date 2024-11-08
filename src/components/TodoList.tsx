import { useContext, useState } from "react";
import { todoContexts, todoProps } from "../contexts/Mycontext";
import { motion } from "framer-motion";
import { ButtonAnimations } from "../contexts/Mycontext";

const TodoList = () => {
  const context = useContext(todoContexts);
  if (!context) {
    throw new Error(
      "The context is not set up properly, and the message comes from TodoList.tsx . Go and check your context or App.tsx"
    );
  }
  const {
    todos,
    setTodos,
    done,
    undo,
    remove,
    edit,
    editMode,
    setEditMode,
    edittingId,
    setEdittingId,
  } = context;

  const [updatValue, setUpdatValue] = useState("");

  return (
    <div className="pt-16 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {todos.map((todo) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={todo.id}
          className="bg-gray-300 text-black rounded-md flex flex-col sm:flex-row justify-between items-center p-4"
        >
          {editMode && edittingId === todo.id ? (
            <input
              className="w-full sm:w-2/3 mb-2 sm:mb-0"
              value={updatValue}
              autoFocus
              required
              type="text"
              onChange={(e) => {
                setUpdatValue(e.target.value);
              }}
            />
          ) : (
            <h1 className={`${todo.completed ? "line-through" : ""} text-lg`}>
              {todo.name}
            </h1>
          )}
          <h1 className="text-sm text-gray-600">{todo.createdAt}</h1>

          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <motion.button
              variants={ButtonAnimations}
              whileTap="whileTab"
              className="hover:bg-red-700 bg-red-600 text-white p-2 rounded-md"
              onClick={() => {
                remove(todo.id);
              }}
            >
              Delete
            </motion.button>

            {editMode && edittingId === todo.id ? (
              <motion.button
                variants={ButtonAnimations}
                whileTap="whileTab"
                className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-md"
                onClick={() => {
                  if (!updatValue) {
                    alert("Please enter the new name of your todo");
                    return;
                  }
                  setTodos((pre: todoProps[]) => {
                    return pre.map((todo) =>
                      todo.id === edittingId
                        ? { ...todo, name: updatValue }
                        : todo
                    );
                  });
                  setEditMode(false);
                  setEdittingId(0);
                  setUpdatValue("");
                }}
              >
                Save
              </motion.button>
            ) : (
              <motion.button
                variants={ButtonAnimations}
                whileTap="whileTab"
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md"
                onClick={() => {
                  edit(todo.id);
                  setEdittingId(todo.id);
                  setUpdatValue(todo.name);
                }}
              >
                Edit
              </motion.button>
            )}

            {todo.completed ? (
              <motion.button
                onClick={() => {
                  undo(todo.id);
                }}
                variants={ButtonAnimations}
                whileTap="whileTab"
                className="bg-lime-600 hover:bg-lime-700 text-white p-2 rounded-md"
              >
                Undo
              </motion.button>
            ) : (
              <motion.button
                onClick={() => {
                  done(todo.id);
                }}
                variants={ButtonAnimations}
                whileTap="whileTab"
                className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-md"
              >
                Done
              </motion.button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TodoList;
