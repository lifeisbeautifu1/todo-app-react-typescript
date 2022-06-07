import React from 'react';
import { ITodo } from '../interfaces';
import { FcCheckmark } from 'react-icons/fc';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context';

interface Props {
  todo: ITodo;
}

const Todo: React.FC<Props> = ({ todo }) => {
  const appContext = useAppContext();
  return (
    <div className={`todo ${todo.complete ? 'completed' : ''}`}>
      <h2>{todo.task}</h2>
      <div className="buttons-wrapper">
        <button
          className="complete-btn"
          onClick={() => appContext?.completeTodo(todo.id)}
        >
          <FcCheckmark className="checkmark" />
        </button>
        {todo.complete ? (
          <button
            className="delete-btn"
            onClick={() => appContext?.deleteTodo(todo.id)}
          >
            <FaTimes className="times" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Todo;
