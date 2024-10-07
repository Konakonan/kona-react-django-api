import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Kakunin = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  let gender= queryParams.get('gender');
  const age = queryParams.get('age');
  const address=queryParams.get('address');
  let gender2='';


  const djangoAdd=async(e)=>{
    e.preventDefault(); //イベントのデフォルトの動作をキャンセルします。例えば、フォームを送信する際、ブラウザは通常、ページをリロードします
    
    if(gender==='男性'){
      gender2='M';
    }else if(gender==='女性'){
      gender2='F';
    }else{
      gender2='O';
    };
    const date={
        name:name,
        age:age,
        gender:gender2,
        address:address
    };

    try {
        const response=await axios.post('http://localhost:8000/api/person/',date,{
           headers:{
            "Content-Type":'application/json',
           } ,
        });
        console.log('date saced:' ,response.data);
        navigate('/kanryo',{state:{message:'登録完了しました'}});
    }catch(error){
        console.error('Error saving date:',error.response?error.response.data:error.message);
        navigate('/kanryo',{state:{message:'エラーが発生しました'}});
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
    <button onClick={djangoAdd}>登録</button>
    </div>
    </>
  )
}


export default Kakunin;