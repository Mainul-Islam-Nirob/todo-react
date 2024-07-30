import React from 'react';

const TodoFilter = ({ showFinished, toggleCompleted }) => {
  return (
    <div>
      <input className='my-4' id='show' onChange={toggleCompleted} type="checkbox" checked={showFinished} />
      <label className='mx-2' htmlFor="show">Show Finished</label>
      <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
    </div>
  );
};

export default TodoFilter;