import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { orderByName, orderByWeight, setFilter, orderByAvWeight} from "../../../redux/actions"
import DogCard from "../DogCard/DogCard"
import Paginado from '../Paginado/Paginado';
import SearchBar from "../SearchBar/SearchBar";
import styles from "./dogs.module.css"

const Dogs = () => {
    const dispatch= useDispatch();
    const dogs= useSelector(state => state.dogs);
    const selector = useSelector(state => state); //me declaro una constante selector que me guarde mi estado global y con ese selector despues puedo seleccionar en mi value, que estado es el que quiero modificar 
    const [order, setOrder]= useState('')
    const [currentPage, setCurrentPage]= useState(1) 
    const [dogsPerPage, setDogsPerPage] = useState(8) 
    const numOfLastDog= currentPage * dogsPerPage;
    const numOfFirstDog= numOfLastDog - dogsPerPage;
    const currentDogs = dogs.slice(numOfFirstDog, numOfLastDog)
    const paginado= (page) => {setCurrentPage(page)}

const temperaments = useSelector((state) => state.temperaments).sort(// agarro el estado temperaments, lo ordeno en orden alfabetico y lo guardo en una constante temperaments 
    function (a, b) {
        if (a < b) return -1;
        else return 1;
    }) 

const handleOrderByName= (event) => { //event es el objeto de evento que se genera al hacer clic en una de las opciones de ordenamiento 
    dispatch(orderByName(event.target.value)); //se esta utilizando dispatch para despachar la acción orderByName, la cual tiene como parámetro el valor seleccionado por el usuario en el menú desplegable.
    setCurrentPage(1); //setCurrentPage(1) es una función que se encarga de actualizar el estado de la página actual a 1. Esto es necesario para que, después de realizar un cambio en el ordenamiento, el usuario pueda ver los primeros resultados de la búsqueda desde el principio.
    setOrder(`Ordered ${event.target.value}`); //es una función que actualiza el estado del ordenamiento actual con el valor seleccionado por el usuario. Esto se utiliza para mostrar en la interfaz el tipo de ordenamiento que se está aplicando actualmente.
}

const handleFilterByOrigin= (event) => { //la función recibe como parámetro el evento de cambio (event) que ocurre en el selector de origen.
    dispatch(setFilter(event.target.value, undefined))//se despacha la acción setFilter con el valor del event.target.value que es loq ue selecciono el cliente en el selector como primer argumento y undefined como segundo argumento, por que undefined? por que handleFilterByOrigin solo esta actualizando el valor de perroFiltrado en la action setFilter y no se establece ningun valor oara FilterTemp por eso se pasa como undefinedm
    setCurrentPage(1); // se actualiza el estado de la página actual a la primera página (1).
    setOrder(`Ordered ${event.target.value}`);//actualizo el estado de ordenamiento con una cadena de texto que indica el valor seleccionado en el selector de origen.
}

const handleFilterByTemper= (event) => {//la función recibe como parámetro el evento de cambio (event) que ocurre en el selector de origen
    dispatch(setFilter(undefined, event.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
}

const handleOrderbyWeight = (event) =>{
    dispatch(orderByWeight(event.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
}

const handleOrderbyAvWeight = (event) =>{
    dispatch(orderByAvWeight(event.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
}

const handle=()=>{
    setCurrentPage(1)
}

return (
    <div>
        <div className={styles.container}>
        <div className={styles.searchBar}>
        <SearchBar 
        variable = {()=>handle()}
        />
        </div>
        <div className={styles.filters}>
    {/* value={selector.perroFiltrado} en el value me traigo el estado que quiero modificar,
    Este evento se dispara cada vez que cambia el valor seleccionado en el elemento de selección desplegable. El evento se maneja mediante la función handleFilterByOrigin(event). */}
    <select  value={selector.perroFiltrado} onChange={event => {handleFilterByOrigin(event)}}>
            <option value="all">All dogs</option>
            <option value="api">Api dogs</option>
            <option value="createInDb">My dogs</option>
        </select>

    <select value={selector.filterTemp} onChange={event => {handleFilterByTemper(event)}}>
        {/* en el value selecciono el estado q quiero modificar, onChange es un evento que se dispara cuando el usuario cambia el valor seleccionado en el select, la función handleFilterByTemper toma el evento como argumento */}
        <option value="all">Temperaments</option> 
        {/* tenemos la etiqueta option con el value "all" que vendria siento el valor predeterminado con el texto all temperaments */}
        {/* despues tenemos un map del estado temperaments, que me genera una etiqueta option por cada temperamento con su respectivo value que seia el mismo temperamento y un index como key */}
            {temperaments.map((temp, index) => {
            return (
                <option value={temp} key={index}>
                    {temp}
                </option>
            );
            })}

    </select> 

    <select value="name" onChange={event =>{handleOrderByName(event)}}>
        {/* value= name establece el valor predeterminado en "name", onChange={event} es un evento que se activa cuando el usuario selecciona una opción en la lista desplegable. Al seleccionar una opción, se llama a la función handleOrderByName con el evento event como argumento. */}
        <option value="name" disabled >Alphabetical </option>
        <option value="a-z">from A to Z</option>
        <option value="z-a">from Z to A</option>
    </select>

    <select value="weight" onChange={event =>{handleOrderbyWeight(event)}}>
        <option value="weight" disabled >Weight </option>
        <option value="min">From lighter to heavier</option>
        <option value="max">From heavier to lighter</option>
    </select>

    <select value="Avweight" onChange={event =>{handleOrderbyAvWeight(event)}}>
        <option value="Avweight" disabled >Avg Weight </option>
        <option value="Asc">From lighter to heavier</option>
        <option value="Desc">From heavier to lighter</option>
    </select>
        </div>
        </div>

<div className={styles.dogCards}>

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
                averageWeight={dog.averageWeight}
                />
                )
            })
        }  
</div>

        <Paginado
            dogsPerPage= {dogsPerPage}
            dogs= {dogs.length}
            pagination= {paginado} 
        />
    </div>
)
}

export default Dogs