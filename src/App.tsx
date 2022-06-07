import React from 'react';
import { Header, Modal, Todo } from './components';
import { useAppContext } from './context';
import { AiOutlinePlus } from 'react-icons/ai';
// import { ITodo } from './interfaces';

const App = () => {
  const appContext = useAppContext();

  if (!appContext) return null;
  const { todoList, isModalOpen, setIsModalOpen } = appContext;

  return (
    <div className="app">
      <Header />
      {isModalOpen ? <Modal /> : null}
      <div className="todos-wrapper">
        {todoList.map((todo, index) => {
          return <Todo key={index} todo={todo} />;
        })}
      </div>
      <button className="open-modal" onClick={() => setIsModalOpen(true)}>
        <AiOutlinePlus className="open-modal-plus" />
      </button>
    </div>
  );
};

export default App;
