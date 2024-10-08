import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Sansyo2 from './Sansyo2';




const Sansyopage = () => {
  
  const [name,setName]=useState('');
  const [gender,setGender] = useState('');
  const [minage,setMinage] = useState('');
  const [maxage,setMaxage] = useState('');
  
  const [query, setQuery] = useState({name:'',gender:'',minage:'',maxage:''});
  const [results, setResults] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const djangoSerch = async (e) => {
    e.preventDefault();
    setQuery({name,gender,minage,maxage});
    console.log(query)

    try {
      const response = await axios.get(`http://localhost:8000/api/person/`, {
        params:query,
      });
      setResults(response.data); // JSONデータをresultsにセット
      console.log('bbb'+ results);
      setIsOpen((prev) => !prev); //isopenを変換
    } catch (error) {
      console.error('Error fetching data:', error);
      
  }
};

  useEffect(() => {
    console.log('aaaaa'+query); 
  }, [query]);

  return (
    <>
    <main>
    <h1>検索</h1>
    <label>名前 : <input type='text' value={name} onChange={(e)=>setName(e.target.value)}></input></label>
    <p></p>
    <label>性別 : 
      <select value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option value="">性別を選択</option>
          <option value="M">男性</option>
          <option value="F">女性</option>
          <option value="O">その他</option>
      </select>
    </label>
    <p></p>
    <label>年齢 : <input type="number" value={minage} onChange={(e)=>setMinage(Number(e.target.value))}></input> ～ <input type='number' value={maxage} onChange={(e)=>setMaxage(Number(e.target.value))}></input></label>
    <p></p>
    <Link to="/">  
      <button>戻る</button>
    </Link>
    <button onClick={djangoSerch}>検索</button>
    <hr />

    <Sansyo2 results={results} isOpen={isOpen}/>
    </main>
    </>
  )
};

export default Sansyopage;