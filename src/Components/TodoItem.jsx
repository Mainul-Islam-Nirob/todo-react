import React from 'react';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const TodoItem = ({ todo, handleCheckbox, handleEdit, handleDelete }) => {
  return (
    <div key={todo.id} className={"todo flex my-3 justify-between"}>
      <div className='flex gap-5'>
        <input name={todo.id} onChange={(e) => handleCheckbox(e)} type="checkbox" checked={todo.isCompleted} id="" />
        <div className={todo.isCompleted ? "line-through" : ""}>{todo.todo}</div>
      </div>
      <div className="buttons flex h-full">
        <button onClick={() => handleEdit(todo.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>
          <FaEdit />
        </button>
        <button onClick={() => handleDelete(todo.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;