import React from 'react'
import Todo from "./Todo";

const TodoList = ({todos,b}) => {
  return (
    todos.map((todo)=>
    <Todo todo={todo} key={todo.name} b={b}/>)


  )
};


export default TodoList

