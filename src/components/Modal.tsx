import React, { ChangeEvent } from 'react';
import { useAppContext } from '../context';
import { ITodo } from '../interfaces';

const Modal = () => {
  const appContext = useAppContext();
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    appContext?.setTask(event.target.value);
  };
  const handleSubmit = () => {
    const newTodo: ITodo = {
      task: appContext?.task,
      complete: false,
      id: new Date().getTime(),
    };
    appContext?.setTodoList([newTodo, ...appContext.todoList]);
    appContext?.setTask('');
  };
  return (
    <div className="modal-wrapper">
      <div className="modal-body">
        <input
          type="text"
          placeholder="Enter task..."
          value={appContext?.task}
          onChange={handleChange}
        />
        <button className="add-btn" onClick={handleSubmit}>
          Add Task
        </button>
        <button
          className="close-btn"
          onClick={() => appContext?.setIsModalOpen(false)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
