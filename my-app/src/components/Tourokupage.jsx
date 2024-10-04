import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState,useRef,useEffect } from 'react';




const Tourokupage = () => {

  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false); //画面遷移のためのuseState
  const[persondate,setPersonDate] = useState({
    name:"",age:"",address:""
    });
  const nameref=useRef();
  const genderref=useRef();
  const ageref=useRef();
  const addresref=useRef();

  const personAdd=()=>{
    const name=nameref.current.value;
    const gender=genderref.current.value
    const age=ageref.current.value;
    const address=addresref.current.value;
    
    setPersonDate({name:name,gender:gender,age:age,address:address})
    setRedirect(true)
  };

  useEffect(() => {
    console.log(persondate); 
  }, [persondate]);

  if(redirect){ //画面遷移、パラメータで値を渡す(あまりよくないが。。)
    navigate(`/Kakunin?name=${persondate.name}&age=${persondate.age}&gender=${persondate.gender}&address=${persondate.address}`);

  };

  return (
    <>
    <main>
      <h1>新規登録画面</h1>
      <div>
      <label>名前 : <input type="text" ref={nameref}></input></label>
      <p></p>
      <label>性別 : 
      <select  ref={genderref}>
      <option>選択してください</option>
            <option >男性</option>
            <option >女性</option>
            <option >その他</option>
        </select></label>
      <p></p>
      <label>年齢 : <input type="number" ref={ageref}></input></label>
      <p></p>
      <label>住所 : <input type="text" ref={addresref}></input></label>
      <p></p>
      </div>
      <hr />
      <Link to="/">  {/*メインメニューに戻るためのリンクボタン*/}
      <button>戻る</button>
      </Link>
      <button onClick={personAdd}>確認</button>
    </main>

    </>
  )
};

export default Tourokupage;