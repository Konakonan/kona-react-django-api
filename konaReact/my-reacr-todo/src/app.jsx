import { useState,useRef } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import TodoList from './components/TodoList'
import Todo from './components/Todo'

export function App() {
const [todos,setTodos] = useState([]);

const todoNameref=useRef()

const [message,setMessage]=useState("");

 const handleAddTodo=()=>{
  const name=todoNameref.current.value;
  console.log(name)
  if(name.length<1){
     setMessage("１文字以上で入力してください")
     return
  };
  setTodos((a)=>{
    return [...a,{id:name,name:name}]
  })
  setMessage("");
  todoNameref.current.value=null;
 };

 function b(item){
  setTodos((a)=>a.filter((todo)=>todo.name!=item))
 };

  return (
    <>
      <dev>
        <p>TodoList</p>
        <TodoList todos={todos} b={b} />
        <input type="text" ref={todoNameref}></input>
        <button onClick={handleAddTodo}>タスクの追加</button>
        <p>{message}</p>
      </dev>
    </>
  )
}

export default App;
