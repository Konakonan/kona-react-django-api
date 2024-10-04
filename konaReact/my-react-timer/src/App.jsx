import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


export function App() {

  const [secondCount,setSecondCount]=useState(0);
  //const [miniteCount,setMiniteCount]=useState(0);
  const [isRun,setIsRun]=useState(false);
  //const [time,setTime]=useState();

  const addSecondCount=(e)=>{
    const e1=parseInt(e.target.value);
    //console.log(e1);
    setSecondCount(e1)
  };
  // const addMiniteCount=(e)=>{
  //   const e1=parseInt(e.target.value);
  //  // console.log(e1);
  //   setMiniteCount(e1)
  // };

  const startCount=()=>{
    if(secondCount>0){
      console.log("現在の分は"+secondCount);
      //console.log("秒は："+miniteCount)
      //setTime(secondCount*60 + miniteCount);
      //console.log("スタートボタンを押しました。現在のtimeは:"+time);
      setIsRun(true);
    };
  };

  useEffect(()=>{
    let interval;
    if(isRun && secondCount>0){
      interval = setInterval(()=>{
        setSecondCount((p)=> p-1);
      },1000)
    }else if (secondCount==0){
      setIsRun(false);
    };
    return () => clearInterval(interval);
  },[isRun,secondCount])


  const stopCount=()=>{
    setIsRun(false);
  };

  const resetCount=()=>{
    // setMiniteCount(0);
    setSecondCount(0);
    setIsRun(false);
   
  };


  return(
    <>
      <h2>MyReactTimer</h2>
      <p>{secondCount}</p>
      <input type="number" label="分" value={secondCount} onChange={addSecondCount}></input> 
      {/* <input type="number" label="秒" value={miniteCount} onChange={addMiniteCount}></input> */}
      <hr />
      <button onClick={startCount}>スタート</button>
      <button onClick={stopCount}>ストップ</button>
      <button onClick={resetCount}>リセット</button> 
    </>
  )
};

export default App;
