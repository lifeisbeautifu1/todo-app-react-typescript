import React from 'react';
import { ITodo } from './interfaces';

interface AppContextInterface {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  task: string;
  setTask: (task: string) => void;
  todoList: ITodo[];
  setTodoList: (todoList: ITodo[]) => void;
  dispatch: React.Dispatch<Action>;
  state: ITodo[];
}

interface Props {
  children?: React.ReactNode;
}

type State = ITodo[];

type Action =
  | { type: 'COMPLETE'; id: number }
  | { type: 'DELETE'; id: number }
  | { type: 'INIT'; todos: ITodo[] }
  | { type: 'ADD'; todo: ITodo };

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'COMPLETE': {
      const newArray: ITodo[] = state.map((todo) => {
        if (todo.id === action.id) {
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
      return newArray;
    }
    case 'DELETE': {
      return state.filter((todo) => {
        return todo.id !== action.id;
      });
    }
    case 'INIT': {
      return action.todos;
    }
    case 'ADD': {
      return [action.todo, ...state];
    }
    default:
      return state;
  }
};

const AppContext = React.createContext<AppContextInterface | null>(null);

const AppContextProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [task, setTask] = React.useState<string>('');
  const [todoList, setTodoList] = React.useState<ITodo[]>([]);
  const [state, dispatch] = React.useReducer(todoReducer, []);

  React.useEffect(() => {
    const todos = localStorage.getItem('todos');
    if (typeof todos === 'string' && todos !== '') {
      const parse = JSON.parse(todos);
      dispatch({ type: 'INIT', todos: parse });
      return;
    }
    dispatch({ type: 'INIT', todos: [] });
  }, []);

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        task,
        setTask,
        todoList,
        setTodoList,
        dispatch,
        state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => React.useContext(AppContext);
