import axios from 'axios';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Kakunin = () => {

    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const gender= queryParams.get('gender');
  const age = queryParams.get('age');
  const address=queryParams.get('address');

  const djanoAdd=async(e)=>{
    e.preventDefault(); //イベントのデフォルトの動作をキャンセルします。例えば、フォームを送信する際、ブラウザは通常、ページをリロードします
    const date={
        id:10,
        name:name,
        age:age,
        gender:"M",
        address:address
    };

    try {
        const response=await axios.post('http://localhost:8000/api/person/',date,{
           headers:{
            "Content-Type":'application/json',
           } ,
        });
        console.log('date saced:' ,response.data);
    }catch(error){
        console.error('Error saving date:',error.response?error.response.data:error.message);
    }
  };

  return (
    <>
    <div>
        <h1>確認ページ</h1>
        <p>名前 : {name}</p>
        <p>性別 : {gender}</p>
        <p>年齢 : {age}</p>
        <p>住所 : {address}</p>
        
    <hr/>
    <Link to="/touroku">
    <button>戻る</button>
    </Link>
    <dev></dev>
    <button onClick={djanoAdd}>登録</button>
    </div>
    </>
  )
}


export default Kakunin;