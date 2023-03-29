import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../../redux/actions";
import styles from "./SearchBar.module.css"

const SearchBar = (props) => {
    const dispatch = useDispatch()
    const [name, setName]= useState("")

    const handlerInputChange =(event)=>{
        setName(event.target.value)
        console.log(name);
    }

    function handleClick(event) {
        if (name.length === 0) {
        return alert("Please input a name to start the search");
        } else {
        dispatch(getDogName(name));
        setName("");
        props.variable()
        }
    }
    

    return(
        <div className={styles.searchBar}>
            <input className={styles.input} type="text" 
            placeholder="Search..."
            value={name}
            onChange={(event)=>handlerInputChange(event)}
            />
            <button className={styles.button} type="submit"
            onClick={(event)=>handleClick(event)}
            ><img src="data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e" alt="" /></button>
        </div>
    )

}

export default SearchBar