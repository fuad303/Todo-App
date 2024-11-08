import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { ContextProvider } from "./contexts/Mycontext";

const App = () => {
  return (
    <div className="text-center p-16 text-white">
      <ContextProvider>
        <TodoInput />
        <TodoList />
      </ContextProvider>
    </div>
  );
};

export default App;
