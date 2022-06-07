import React from 'react';
import { Header, Modal, Todo } from './components';
import { useAppContext } from './context';
import { AiOutlinePlus } from 'react-icons/ai';
// import { ITodo } from './interfaces';

const App = () => {
  const appContext = useAppContext();
  React.useEffect(() => {
    const todos = localStorage.getItem('todos');
    if (typeof todos === 'string' && todos !== '') {
      const parse = JSON.parse(todos); // ok
      appContext?.setTodoList(parse);
      return;
    }
    appContext?.setTodoList([]);
  }, []);

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(appContext?.todoList));
  }, [appContext?.todoList]);
  return (
    <div className="app">
      <Header />
      {appContext?.isModalOpen ? <Modal /> : null}
      <div className="todos-wrapper">
        {appContext?.todoList.map((todo, index) => {
          return <Todo key={index} todo={todo} />;
        })}
      </div>
      <button
        className="open-modal"
        onClick={() => appContext?.setIsModalOpen(true)}
      >
        <AiOutlinePlus className="open-modal-plus" />
      </button>
    </div>
  );
};

export default App;
