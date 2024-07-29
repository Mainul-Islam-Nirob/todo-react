import { useState, useEffect } from 'react'
import Footer from "./Components/Footer.jsx"
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
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
    }else {
      localStorage.clear();  
    }
  }, [todos]);
 

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  

  const handleEdit = (e, id) => {
      setEditMode(true);
      setEditId(id);
      const taskToEdit = todos.find(item => item.id === id);
      setTodo(taskToEdit.todo);
  };

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && todo.length > 3) {
      handleAdd();
    }
  };

  const handleAdd= ()=>{
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
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }
  

  return (
    < >
       <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 h-[94vh] md:w-[45%] overflow-hidden">
        <h1 className='font-bold text-center text-3xl'><span className='text-violet-900 cursor-pointer'>iTask</span> - Manage your todos at one place</h1>
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
        
          <div className="flex">
          <input  onChange={handleChange} onKeyDown={handleKeyDown}  value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
         </div>
         <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
         <h2 className='text-2xl font-bold'>Your Todos</h2>
         <div className="mt-2 todos overflow-hidden overflow-y-auto h-fit max-h-[50vh]">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
          {todos.map(item=>{
 
          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
            <div className='flex gap-5'> 
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
           
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>
                <FaEdit /> 
              </button>
      
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>
                <AiFillDelete /> 
              </button>
            </div> 
          </div>
          })}
         </div>
        
       </div>
     
       <Footer/>
    </>
  )
}

export default App