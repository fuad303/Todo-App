import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { format } from "date-fns";
//todo props
export interface todoProps {
  name: string;
  id: number;
  completed: boolean;
  createdAt: string;
}
//Context props
interface contextProps {
  todos: todoProps[];
  setTodos: Dispatch<SetStateAction<todoProps[]>>;
  makeTodo: (input: string) => void;
  remove: (id: number) => void;
  edit: (id: number) => void;
  done: (id: number) => void;
  undo: (id: number) => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  setEdittingId: (mode: number) => void;
  edittingId: number;
  input: string;

  setInput: (mode: string) => void;
}
//context provider props
interface contextProviderProps {
  children: ReactNode;
}

export const ButtonAnimations = {
  whileTab: { scale: 0.9 },
};

export const todoContexts = createContext<contextProps | undefined>(undefined);

export const ContextProvider: React.FC<contextProviderProps> = ({
  children,
}) => {
  const [todos, setTodos] = useState<todoProps[]>(() => {
    const storedData = localStorage.getItem("todos");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [editMode, setEditMode] = useState(false);
  const [edittingId, setEdittingId] = useState(0);
  const [input, setInput] = useState("");

  function makeTodo(input: string) {
    if (!input) return;
    const newDate = new Date();

    const creationDate = format(newDate, "hh:mm a   d/ MMM/ yyyy");

    const newTodo = {
      name: input,
      id: Date.now(),
      completed: false,
      createdAt: creationDate,
    };
    setTodos((pre) => [...pre, newTodo]);
  }

  function remove(id: number) {
    const filteredArray = todos.filter((todo) => todo.id !== id);
    setTodos(filteredArray);
  }
  function edit(id: number) {
    setEditMode(true);
    setEdittingId(id);
  }
  function done(id: number) {
    setTodos((pre) => {
      return pre.map((todo) => {
        return todo.id === id ? { ...todo, completed: true } : todo;
      });
    });
  }
  function undo(id: number) {
    setTodos((pre) => {
      return pre.map((todo) => {
        return todo.id === id ? { ...todo, completed: false } : todo;
      });
    });
  }
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <todoContexts.Provider
      value={{
        input,
        setInput,
        todos,
        setTodos,
        editMode,
        setEditMode,
        makeTodo,
        remove,
        edit,
        done,
        undo,
        setEdittingId,
        edittingId,
      }}
    >
      {children}
    </todoContexts.Provider>
  );
};
