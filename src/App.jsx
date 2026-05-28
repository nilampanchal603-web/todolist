import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
// import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinish=(e)=>{
    setshowFinished(!showFinished)

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }


  const handleChenge = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
    <div > 
      <Navbar />
      <div className=' mx-3 md:container md:mx-auto my-5 rounded-xl p-3 bg-gray-200 min-h-[80vh] md:w-1/2'>
      <h1 className='font-bold text-center text-xl'>iTask-Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4 ">
          <h2 className='text-lg font-bold'> Add a Todo</h2>
          <input type='text' onChange={handleChenge} value={todo} className='w-full border-2 rounded-full px-5 py-1 ' />
          <button className='text-sm disabled:bg-gray-900  bg-gray-500 hover:bg-gray-800 px-2 py-1 text-white rounded-md cursor-pointer font-bold w-15 ' disabled={todo.length<=3} onClick={handleAdd}>Save</button>
        </div>
        <input type='checkbox' className="my-2" onChange={toggleFinish} checked={showFinished}/>Show Finished
        <h2 className='text-lg font-bold'> Your Todos</h2>
        <div className="todos">{todos.length == 0 && <div className='m-5'>No todos display</div>}{todos.map(item => {
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2   my-3 justify-between">
            <div className='flex gap-5'>
              <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>
            <div className="button flex h-full ">
              <button className='text-sm bg-gray-500 hover:bg-gray-800 px-2 py-1 text-white rounded-md cursor-pointer m-2  font-bold' onClick={(e) => { handleEdit(e, item.id) }}><CiEdit /></button>
              <button className='text-sm bg-gray-500 hover:bg-gray-800 px-2 py-1 text-white rounded-md cursor-pointer m-2  font-bold' onClick={(e) => { handleDelete(e, item.id) }}><AiTwotoneDelete /></button>

            </div>

          </div>
        })}
        </div>
      </div>
      </div>
    </>
  )
}

export default App
