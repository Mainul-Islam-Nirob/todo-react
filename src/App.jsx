import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = (e, id) => {
    let t = todos.filter(todo => todo.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(todo => {
      return todo.id !==id
    })
    setTodos(newTodos)
   };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 rounded-xl bg-violet-100 min-h-[80vh]">
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
          >
            Save
          </button>
        </div>

        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5">No Todos to Display...</div>
          )}
          {todos.map((todo) => {
            return (
              <div
                key={todo.id}
                className="todo flex w-1/4 justify-between my-2"
              >
               <div className="flex gap-4">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    value={todo.isCompleted}
                    name={todo.id}
                    id=""
                  />
                  <div className={todo.isCompleted ? "line-through" : ""}>
                    {todo.todo}
                  </div>
                </div>

                <div className="buttons">
                  <button
                    onClick={(e) => {
                      handleEdit(e, todo.id)
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, todo.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
