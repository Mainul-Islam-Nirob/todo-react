import React from 'react';

const TodoInput = ({ handleAdd, todo, setTodo }) => {

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && todo.length > 3) {
        handleAdd();
      }
  };

  return (
    <div className="addTodo my-5 flex flex-col gap-4">
      <h2 className='text-2xl font-bold'>Add a Todo</h2>
      <div className="flex">
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={todo}
          type="text"
          className='w-full rounded-full px-5 py-1'
        />
        <button
          onClick={handleAdd}
          disabled={todo.length <= 3}
          className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TodoInput;