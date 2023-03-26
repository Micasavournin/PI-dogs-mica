import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import {filterCreated, getDogs, orderByName, orderByWeight, filterByTemper, getTemperaments, setFilter} from "../../../redux/actions"
import DogCard from "../DogCard/DogCard"
import Paginado from '../Paginado/Paginado';
import SearchBar from "../SearchBar/SearchBar";


//This function has the complete logic of /home path

const Dogs = () => {
    //I create all the consts I need to use in this function
    const dispatch= useDispatch();
    const dogs= useSelector(state => state.dogs);
    const selector = useSelector(state => state);
    const [order, setOrder]= useState('')
    const [temperament, setTemperament]= useState('all')
    const [currentPage, setCurrentPage]= useState(1) //I start always on page 1
    const [dogsPerPage, setDogsPerPage] = useState(8) //this number 8 is the amount of dogs I want to show per page
    const numOfLastDog= currentPage * dogsPerPage;
    const numOfFirstDog= numOfLastDog - dogsPerPage;
    const currentDogs = dogs.slice(numOfFirstDog, numOfLastDog)

    //I create all the functions

    const paginado= (page) => {setCurrentPage(page)}

//me trae todos los perros y temperamentos y se me llena el estado cdo se me monta el componente 

const temperaments = useSelector((state) => state.temperaments).sort(
    function (a, b) {
        if (a < b) return -1;
        else return 1;
    }) //ordeno los temperamentos por orden alfabetico

const handleOrderByName= (event) => {
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
}

const handleFilterByOrigin= (event) => {
    dispatch(setFilter(event.target.value, undefined))
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
}

const handleFilterByTemper= (event) => {
    dispatch(setFilter(undefined, event.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
}

const handleOrderbyWeight = (event) =>{
    dispatch(orderByWeight(event.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
}

const handle=()=>{
    setCurrentPage(1)
}

return (
    <div>
        <SearchBar 
        variable = {()=>handle()}
        />
    <div>Filters</div>
    <select value={selector.perroFiltrado} onChange={event => {handleFilterByOrigin(event)}}>
            <option value="all">All dogs</option>
            <option value="api">Api dogs</option>
            <option value="createInDb">My dogs</option>
        </select>

    <select value={selector.filterTemp} onChange={event => {handleFilterByTemper(event)}}>
        <option value="all">All Temperaments</option>
            {temperaments.map((temp, index) => {
            return (
                <option value={temp} key={index}>
                    {temp}
                </option>
            );
            })}
    </select> 

    <select value="name" onChange={event =>{handleOrderByName(event)}}>
        <option value="name" disabled >Alphabetical order</option>
        <option value="a-z">from A to Z</option>
        <option value="z-a">from Z to A</option>
    </select>

    <select value="weight" onChange={event =>{handleOrderbyWeight(event)}}>
        <option value="weight" disabled >Weight order</option>
        <option value="min">From lighter to heavier</option>
        <option value="max">From heavier to lighter</option>
    </select>

    {
        currentDogs?.map(dog=> {
        return (
            <DogCard
                id= {dog.id}
                key= {dog.id}
                image= {dog.image}
                name= {dog.name}
                temperament= {dog.temperament}
                weightMin= {dog.weightMin}
                weightMax= {dog.weightMax}
                />
                )
            })
        }  

        <Paginado
            dogsPerPage= {dogsPerPage}
            dogs= {dogs.length}
            pagination= {paginado} 
        />
    </div>
)
}

export default Dogs