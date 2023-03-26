import Dogs from './Dogs/Dogs';
import SearchBar from './SearchBar/SearchBar';
import { getDogs } from "../../redux/actions"
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const [dog, setDog]= useState("");
  const dispatch= useDispatch();  

  const handleClick= (event)=> {
  event.preventDefault();
  dispatch(getDogs());
  setDog("");
}    
  
  return (
    <div>
      <h1>Dogs...</h1>
      <Link to="/dogs" >Create Dog</Link>
      <button onClick={(event)=> handleClick(event)}>Reload Dogs</button>
      <Dogs/>
    </div>
  )
}

export default Home;