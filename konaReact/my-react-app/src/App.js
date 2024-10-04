import logo from './logo.svg';
import './App.css';


//import Article from './components/Article';
import TodoList from './components/TodoList';
import { useState,useRef } from 'react';

function App() {
  const [todos,setTodos]=useState([{
    id: 1,name: "todo1", complted: false
  }]);

  const todoNameRef=useRef();

  const handleAddTodo=()=>{
    const name=todoNameRef.current.value;
    console.log(name)
    if (name==""){
      return
    };
    setTodos((prevTodos) => {
      return [...prevTodos,{id:name,name:name,complted:false}]
    })
    todoNameRef.current.value=null;
  };

  const toggleTodo=(id)=>{
    const newTodos=[...todos];
    const todo=newTodos.find((todo) => todo.id===id)
    todo.complted=!todo.complted;
    setTodos(newTodos);
  };

  const handleCear=()=>{
    const newTodos=todos.filter((todo)=> !todo.complted);
    setTodos(newTodos);
  };

  return (
   <div>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input type="text" ref={todoNameRef}></input>
    <button onClick={handleAddTodo}>タスクを追加</button>
    <button onClick={handleCear}>完了したタスクの削除</button>
  <div>残りのタスク:{todos.filter((todo) => !todo.complted).length}</div>
    </div>
 
  );
}

export default App;
