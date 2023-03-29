import {useEffect}from 'react'
import { useDispatch } from "react-redux";
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Landing from '../src/components/Landing/Landing'
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import DogCreate from './components/DogCreate/DogCreate';
import {getDogs, getTemperaments} from "./redux/actions"
import About from './components/About/About';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments())
  }, [dispatch]);

  return (
    <div className="App">
        <Routes> 
          <Route path = '/' element= {<Landing/>} />
          <Route path = '/home' element= {<Home/>} />
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/dogs' element={<DogCreate/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </div>
  );
}

export default App;

