import React from 'react';
import { Header, Modal, Todo } from './components';
import { useAppContext } from './context';
import { AiOutlinePlus } from 'react-icons/ai';

const App = () => {
  const appContext = useAppContext();

  if (!appContext) return null;
  const { state, isModalOpen, setIsModalOpen } = appContext;

  return (
    <div className="app">
      <Header />
      {isModalOpen ? <Modal /> : null}
      <div className="todos-wrapper">
        {state.map((todo, index) => {
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
