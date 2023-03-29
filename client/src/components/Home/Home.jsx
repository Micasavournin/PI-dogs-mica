import Dogs from './Dogs/Dogs';
import { getDogs } from "../../redux/actions"
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from "./home.module.css"
// import About from '../About/About';

const Home = () => {
  const [dog, setDog]= useState("");
  const dispatch= useDispatch();  
  const handleClick= (event)=> {
  event.preventDefault();
  dispatch(getDogs());
  setDog("");
}    
  
  return (
    <div className={styles.div1}>
      {/* <Link to="/about">About</Link> */}
      <div className={styles.div2}>
        
      <Link to="/dogs" ><h1>Create Dog</h1></Link>
      <button className={styles.miBoton} onClick={(event)=> handleClick(event)}>Reload</button>
      </div>

      <div className={styles.dogCards}>
      <Dogs/>
      </div>
    </div>
  )
}

export default Home;