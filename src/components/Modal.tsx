import React, { ChangeEvent } from 'react';
import { useAppContext } from '../context';
import { ITodo } from '../interfaces';

const Modal = () => {
  const appContext = useAppContext();
  if (!appContext) return null;
  const { setTask, task, todoList, setTodoList, setIsModalOpen } = appContext;
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };
  const handleSubmit = () => {
    const newTodo: ITodo = {
      task,
      complete: false,
      id: new Date().getTime(),
    };
    setTodoList([newTodo, ...todoList]);
    setTask('');
  };
  return (
    <div className="modal-wrapper">
      <div className="modal-body">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={handleChange}
        />
        <button className="add-btn" onClick={handleSubmit}>
          Add Task
        </button>
        <button className="close-btn" onClick={() => setIsModalOpen(false)}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
