import React from 'react';
import { ITodo } from './interfaces';

interface AppContextInterface {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  task: string;
  setTask: (task: string) => void;
  todoList: ITodo[];
  setTodoList: (todoList: ITodo[]) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

interface Props {
  children?: React.ReactNode;
}

const AppContext = React.createContext<AppContextInterface | null>(null);

const AppContextProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [task, setTask] = React.useState<string>('');
  const [todoList, setTodoList] = React.useState<ITodo[]>([]);

  const completeTodo = (id: number): void => {
    const newArray: ITodo[] = todoList.map((todo) => {
      if (todo.id === id) {
        const newTodo: ITodo = {
          ...todo,
          complete: true,
        };
        return newTodo;
      } else return todo;
    });

    newArray.sort((a, b) => {
      const num1: number = a.complete ? 1 : 0;
      const num2: number = b.complete ? 1 : 0;
      return num1 - num2;
    });

    setTodoList(newArray);
  };
  const deleteTodo = (id: number): void => {
    setTodoList((prevState) => {
      return prevState.filter((todo) => {
        return todo.id !== id;
      });
    });
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        task,
        setTask,
        todoList,
        setTodoList,
        completeTodo,
        deleteTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => React.useContext(AppContext);
