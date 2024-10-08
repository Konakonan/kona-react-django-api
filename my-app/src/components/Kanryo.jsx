import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Kanryo = () => {
    
    const location = useLocation();
    const {message} = location.state || {};

    const [links,setLinks] =useState();
    const [paths,setPaths] =useState();

    useEffect(()=>{
        if(message==="登録完了しました"){
            setLinks("メインメニュに戻る");
            setPaths("/");
        }else if(message==="詳細を確認できるのは1名のみ選択さた時です"){
            setLinks("戻る");
            setPaths("/Sansyo");
        }else{
            setLinks("戻る");
            setPaths("/touroku");
        }
    },[message])


  
    return (
    <>
    <div>
        <p>{message}</p>
        <hr />
        <Link to={paths}>  
        <button>{links}</button>
        </Link>

    </div>
    </>
  )
}


export default Kanryo;