import './App.css';
import Mainmenu from './components/Mainmenu';
import Tourokupage from './components/Tourokupage';
import Sansyopage from './components/Sansyopage';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { useState,useEffect, useRef } from 'react';
import Kakunin from './components/Kakunin';

function App() {
  /* apiと繋ぐコード     */
  // const [persons, setPersons] = useState([]);

  //   useEffect(() => {
  //       const fetchPersons = async () => {
  //           try {
  //               const response = await fetch('http://localhost:8000/api/person/');
  //               const date = await response.json();
  //               setPersons(date);
  //               console.log(persons)
  //           } catch (error) {
  //               console.error("Error fetching data", error);
  //           }
  //       };
  //       fetchPersons();
  //   }, []);

  return (
    <>
    <Router>
    <dev className="App">
      
    
    <Routes>
      <Route exact path="/" element={<Mainmenu/>} />
      <Route path='/touroku' element={<Tourokupage />} />
      <Route path='/sansyo' element={<Sansyopage />} />
      <Route exact path="/kakunin" element={<Kakunin/>} />
    
    </Routes>
    </dev>
    </Router>
    
    </>
  );
}

export default App;
