import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, showFinished, handleCheckbox, handleEdit, handleDelete }) => {
  return (
    <div className="mt-2 todos overflow-hidden overflow-y-auto h-fit max-h-[53vh]">
      {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
      {todos.map(todo => (
        (showFinished || !todo.isCompleted) && <TodoItem
          key={todo.id}
          todo={todo}
          handleCheckbox={handleCheckbox}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;