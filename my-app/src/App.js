import './App.css';
import Mainmenu from './components/Mainmenu';
import Tourokupage from './components/Tourokupage';
import Sansyopage from './components/Sansyopage';
import Kakunin from './components/Kakunin';
import Kanryo from './components/Kanryo';
import Syousai from './components/Syousai';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"



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
      <Route exact path="/kakunin" element={<Kakunin/>} />
      <Route exact path="/kanryo" element={<Kanryo />} />
      
      <Route path='/sansyo' element={<Sansyopage />} />
      <Route path="/Syousai/:id" element={<Syousai/>} />
    
    </Routes>
    </dev>
    </Router>
    
    </>
  );
}

export default App;
