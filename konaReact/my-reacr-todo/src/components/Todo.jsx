import React from 'react'

const Todo = ({todo,b}) => {
    const handleCreanTodo=()=>{
        b(todo.name);
    };

  return (
    <>
    <p>{todo.name}
    <button onClick={handleCreanTodo}>タスクの削除</button>
    </p>
    </>
  )
};

export default Todo;
