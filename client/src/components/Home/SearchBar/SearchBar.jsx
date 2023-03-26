import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../../redux/actions";

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
        <div>
            <input type="text" 
            placeholder="Search..."
            value={name}
            onChange={(event)=>handlerInputChange(event)}
            />
            <button type="submit"
            onClick={(event)=>handleClick(event)}
            >Search</button>
        </div>
    )

}

export default SearchBar