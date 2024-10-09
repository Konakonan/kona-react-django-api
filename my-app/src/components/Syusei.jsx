import React from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

const Syusei = () => {
    
    const {id}=useParams()
    const navigate4 = useNavigate();

    const [products,setProducts]=useState({
        id:"",name:"",age:"",address:"",gender:""
      });

    useEffect(()=>{
        const fetchProducts=async()=>{
        try{
            const respons=await axios.get(`http://localhost:8000/api/person2/${id}/`);
            setProducts(respons.data)
        }catch(err){
            console.log("error")
        }
        };
        fetchProducts();
    },[id])

    const changePerson = (e) => {
      const { name, value } = e.target;
      setProducts(prevState => ({
        ...prevState,
        [name]: value
      }));
      console.log(products)
    };

    const putPerson=async(e)=>{
      e.preventDefault();
      try{
        const respons = await axios.put(`http://localhost:8000/api/person2/${id}/`, products);
        console.log(respons.data)
        navigate4(`/Syousai/${id}`)
      }catch(error){
        console.log(error)
      }
    }

  return (
    <>
    <main>
    <div>修正</div>
    <p>ID : {products.id}</p>
    <div>
      <label>名前 : <input type="text"name="name" value={products.name}  onChange={changePerson} required></input></label>
      <p></p>
      <label>性別 : 
      <select name="gender" value={products.gender} onChange={changePerson}  required>
            <option  value="">選択してください</option>
            <option value="M">男性</option>
            <option value="F">女性</option>
            <option value="O">その他</option>
        </select></label>
      <p></p>
      <label>年齢 : <input type="number" name="age" value={products.age} onChange={changePerson} required></input></label>
      <p></p>
      <label>住所 : <input type="text" name="address" value={products.address} onChange={changePerson} required></input></label>
      <p></p>
      </div>
      <hr />
      <Link to='/Sansyo'>
      <button>戻る</button>
      </Link>
      <button onClick={putPerson}>再登録</button>
    </main>
    </>
  )
}

export default Syusei;