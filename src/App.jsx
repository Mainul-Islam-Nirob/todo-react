import './App.css'
import Navbar from './Components/Navbar'

function App() {
 
  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-5 p-5 rounded-xl bg-violet-100 min-h-[80vh]">
       <div className="addTodo">
        <h2 className="text-lg font-bold">Add a Todo</h2>
        <input type="text" className='w-1/2' />
        <button className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>Add</button>
       </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          <div className="todo flex">
            <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis rem, provident odit illum nulla quis minus!</div>
            <div className="buttons">
              <button className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
              <button className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
