import React, { useState } from 'react'


const Counter = ({count,setCount,b}) => {

const handleAdd =() =>{
    const count2=count+1;
    setCount(count2);
};

const handleMis=()=>{
    b();
};

  return (
    <>
    <div>counter</div>
    <p>{count}</p>
    <button onClick={handleAdd}>+</button>
    <button onClick={handleMis}>-</button>
    </>
  );
};

export default Counter;