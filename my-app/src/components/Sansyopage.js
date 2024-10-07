import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRef,useState,useEffect } from 'react';


const Sansyopage = () => {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const queryref=useRef();

  const djangoSerch = async (e) => {
    e.preventDefault();
    setQuery(queryref.current.value);
    //console.log(query)

    try {
      const response = await axios.get(`http://localhost:8000/api/person/`, {
        params: { query } // クエリパラメータとして送信
      });
      setResults(response.data); // JSONデータをresultsにセット
      
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
    <label>名前 : <input type='text'  ref={queryref}></input></label>
    <p></p>
    <label>性別 : 
      <select>
          <option >男性</option>
          <option >女性</option>
          <option >その他</option>
      </select>
    </label>
    <p></p>
    <label>年齢 : <input type="number"></input> ～ <input type='number'></input></label>
    <p></p>
    <Link to="/">  
      <button>戻る</button>
    </Link>
    <button onClick={djangoSerch}>検索</button>
    <hr />
   
    {results.map((item) => (
          <p>{item.name}</p> ))}
    </main>
    </>
  )
}

export default Sansyopage;