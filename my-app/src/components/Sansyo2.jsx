import React from 'react'
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

const Sansyo2 = ({results,isOpen}) => {
    
    const [checkedItems, setCheckedItems] = useState({});

    const navigate2 = useNavigate();
    const [redirect, setRedirect] = useState(false); //画面遷移のためのuseState
  

    useEffect(()=>{
        const initialChecked = {};
        results.forEach(item => {
        initialChecked[item.id] = false; // idを使ってチェックボックスを管理
    });
        setCheckedItems(initialChecked);
      // console.log('selectedItems is'+checkedItems);
    },[results])

   

    const checkboxChange = (id) => {
        setCheckedItems((prev) => ({
          ...prev,
          [id]: !prev[id], // チェックボックスの状態をトグル
        }));
      };
// 29行目のcheckedItemsは、各チェックボックスの状態を管理するオブジェクトです。
//この関数は、checkedItemsのすべてのキー（つまり、チェックボックスのid）を配列として返します。
//filterメソッドは、配列から特定の条件を満たす要素だけを抽出して新しい配列を作成します。
      const handleSubmit=()=>{
        const selectedItems = Object.keys(checkedItems).filter((id) => checkedItems[id]);
        if (selectedItems.length === 1) {
           console.log('selectedItems is'+selectedItems);
           setRedirect(true);
           if(redirect){
            navigate2(`/Syousai/${selectedItems}`)
          };
        }else if(selectedItems.length === 0){
            //
        }else{
            navigate2('/kanryo',{state:{message:'詳細を確認できるのは1名のみ選択さた時です'}});
          }
      };

  return (
    <>
    {isOpen &&(
    <>
    <table>
    <tr>
      <th>名前</th>
      <th>年齢</th>
      <th>性別</th>
      <th>〆</th>
    </tr>
      {results.map((item)=>(
        <tr>
        <td>{item.name}</td><td>{item.age}</td><td>{item.gender}</td>
        <td><input type='checkbox' onChange={() => checkboxChange(item.id)}></input></td>
        </tr>
      ))}
  </table>
  <button onClick={handleSubmit}>決定</button>
   </>
   )}
    </>
  )
}

export default Sansyo2;