import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link,useNavigate } from "react-router-dom";

const Syousai = () => {
  
  const {id} = useParams();

  const [products,setProducts]=useState({
    id:"",name:"",age:"",address:"",gender:""
  });

  const navigate3 = useNavigate();

  
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

  const putPerson=()=>{
    navigate3(`/Syusei/${id}`)

  };

  return (
    <>
    <main>
    <h1>詳細情報</h1>
    <p>ID : {products.id}</p>
    <p>名前 : {products.name}</p>
    <p>性別 : {products.gender}</p>
    <p>年齢 : {products.age}</p>
    <p>住所 : {products.address}</p>
    <hr />
    <Link to='/Sansyo'>
    <button>戻る</button>
    </Link>
    <button onClick={putPerson}>修正</button>
    
    </main>
    </>
  )
}

export default Syousai