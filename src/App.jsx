import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';
import TodoFilter from './Components/TodoFilter';
import Footer from "./Components/Footer";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.clear(); 
    } 
    }, [todos]);

    const handleAdd = () => {
      const existingTodoIndex = todos.findIndex(item => item.id === editId);

      if (existingTodoIndex !== -1) {
        // Replace existing todo
        const newTodos = [...todos];
        newTodos[existingTodoIndex].todo = todo;
        setTodos(newTodos);
        setEditMode(false);
        setEditId(null);
      } else {
        // Add new todo
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      }
    
      setTodo("");
    };
  
    const handleCheckbox = (e) => {
      const id = e.target.name;
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isCompleted: !todo.isCompleted };
          }
          return todo;
        })
      );
    };
  
    const handleEdit = (id) => {
      setEditMode(true);
      setEditId(id);
      const taskToEdit = todos.find(item => item.id === id);
      setTodo(taskToEdit.todo);
    };
  
    const handleDelete = (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };
  
    const toggleCompleted = () => {
      setShowFinished(!showFinished);
    };
  
    return (
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-8 bg-violet-100 h-[94vh] md:w-[45%] overflow-hidden">
        <Header />
        <TodoInput handleAdd={handleAdd} todo={todo} setTodo={setTodo} />
        <TodoFilter showFinished={showFinished} toggleCompleted={toggleCompleted} />
        <TodoList
          todos={todos}
          showFinished={showFinished}
          handleCheckbox={handleCheckbox}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <Footer />
      </div>
    );
  }
  
  export default App;