import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState([]);
  const [countX,setCountX]=useState([]);
  const [goukei,setGoukei]=useState(0);
 
  //数値ボタンの関数
  const count0=()=>{
    setCountX((p)=>{
      return [...p,0]
    })
  };
  const count1=()=>{
    setCountX((p)=>{
      return[...p,1]
    })
  };
  const count2=()=>{
    setCountX((p)=>{
      return[...p,2]
    })
  };
  const count3=()=>{
    setCountX((p)=>{
      return[...p,3]
    })
  };
  const count4=()=>{
    setCountX((p)=>{
      return[...p,4]
    })
  };
  const count5=()=>{
    setCountX((p)=>{
      return[...p,5]
    })
  };
  const count6=()=>{
    setCountX((p)=>{
      return[...p,6]
    })
  };
  const count7=()=>{
    setCountX((p)=>{
      return[...p,7]
    })
  };
  const count8=()=>{
    setCountX((p)=>{
      return[...p,8]
    })
  };
  const count9=()=>{
    setCountX((p)=>{
      return[...p,9]
    })
  };
  const countXX=()=>{
    setCountX((p)=>{
      return[...p,"."]
    })
  };

  //足し算の関数
  const addCount=()=>{
    //console.log(countX)
    const a= countX.join("");
    const a2=parseFloat(a);
    setCountX([])
    setCount((k)=>{
      return [...k,a2,"+"];
    })
  };
  //引き算の関数
  const resCount=()=>{
    const a=countX.join("");
    const a2=parseInt(a);
    setCountX([]);
    setCount((k)=>{
      return [...k,a2,"-"]
    })
  };
  //掛け算の関数
  const jyoCount=()=>{
    const a=countX.join("");
    const a2=parseInt(a);
    setCountX([]);
    setCount((k)=>{
      return[...k,a2,"*"]
    })
  };
  //割り算の関数
  const wariCount=()=>{
    const a=countX.join("");
    const a2=parseInt(a);
    setCountX([]);
    setCount((k)=>{
      return [...k,a2,"/"]
    })
  };

  //=の処理を行う関数
  const input=["+","-","*","/"]
  const iqualCount=()=>{
    //console.log(countX)
    const a= countX.join("");
    const a2=parseFloat(a);

    switch(true){
      case count.includes(input[0]):
        const b=count[0]+a2;
        console.log(b)
        setGoukei(b);
        setCount([]);
        break;
      case count.includes(input[1]):
        const b2=count[0]-a2;
        console.log(b2)
        setGoukei(b2);
        setCount([]);
        break
      case count.includes(input[2]):
        const b3=count[0]*a2;
        console.log(b3)
        setGoukei(b3);
        setCount([]);
        break
      case count.includes(input[3]):
        const b4=count[0] / a2;
        console.log(b4);
        setGoukei(b4);
        setCount([]);
        break
      default:
          setGoukei(0)
    };
  };


  //数値をクリアする関数
  const clearCount=()=>{
    setCount([]);
    setCountX([]);
    setGoukei(0);
  };


  return (
    <>
    <h2>MyReactCalc</h2>
    <table>
      <thead>
        <tr>
          <th>{goukei}</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td><button onClick={count7}>7</button></td>
        <td><button onClick={count8}>8</button></td>
        <td><button onClick={count9}>9</button></td>
        <td><button onClick={addCount}>+</button></td>
      </tr>
      <tr>
        <td><button onClick={count4}>4</button></td>
        <td><button onClick={count5}>5</button></td>
        <td><button onClick={count6}>6</button></td>
        <td><button onClick={resCount}>-</button></td>
      </tr>
      <tr>
        <td><button onClick={count1}>1</button></td>
        <td><button onClick={count2}>2</button></td>
        <td><button onClick={count3}>3</button></td>
        <td><button onClick={jyoCount}>*</button></td>
      </tr>
      <tr>
        <td><button onClick={count0}>0</button></td>
        <td><button onClick={wariCount}>/</button></td>
        <td><button onClick={countXX}>.</button></td>
        <td><button onClick={iqualCount}>=</button></td>
      </tr>
      <tr>
        <td><button onClick={clearCount}>Clear</button></td>
      </tr>
      </tbody>
    </table>
    </>
  )
};

export default App
