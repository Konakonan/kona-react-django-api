import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Counter from './Counter';
import { renderToStaticMarkup } from 'react-dom/server';

function App() {
  const [count, setCount] = useState(0)

   
   const b=()=>{
    if(count>0){
    const count2=count-1;
    setCount(count2);
    console.log(count2)
   }else{
    return ;
   }
  };

  return (
    <Counter count={count} setCount={setCount} b={b}/>
  )
};

export default App
