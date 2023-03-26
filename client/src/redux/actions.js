import axios from "axios";
import { GET_DOGS, DOG_DETAIL, CLEAN_DETAIL, GET_TEMPERAMENTS, ORDER_BY_NAME, ORDER_BY_WEIGHT, FILTER_CREATED, FILTER_BY_TEMPER, GET_DOG_NAME, SET_FILTER_DOG, FILTER_DOG} from "./actionTypes";

export const getDogs = ()=> {
    return async function(dispatch){
        const info= await axios("http://localhost:3001/dogs")
        return dispatch({
            type: GET_DOGS,
            payload: info.data
        })
    }
}

export const getdogDetail=(id)=>{
    return async function(dispatch){
        let json= await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: DOG_DETAIL, 
            payload: json.data
        })
    }
} //me trae el perro q coincida cn el id q le pasamos y me guarda la info en el payload

export const cleanDetail=()=>{
    return{type: CLEAN_DETAIL}// me borra el estado detail cuando se desmonta detail
}

export const getTemperaments=()=>{
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/temperaments");
        let listOfTemperaments = json.data.map(temp => temp.name)
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: listOfTemperaments
        });
}} //me trae los temperamentos de la api

export const orderByName= (payload)=> {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByWeight= (payload)=> {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

//dispatch(setFilter(undefined, "all"))
export const setFilter = (perroFiltrado = undefined, filterTemp = undefined) => {
    return function(dispatch) {
        dispatch({type: SET_FILTER_DOG, payload: {perroFiltrado, filterTemp}})
        dispatch(Filter())
    }
}

export const Filter = () => {
    return {
        type: FILTER_DOG
    }
}


export const getDogName= (name)=> {
    return async function (dispatch){
        try {
        let json = await axios (`http://localhost:3001/dogs?name=${name}`)
        return dispatch({
            type: GET_DOG_NAME,
            payload: json.data
        })
        } catch (error) {
        alert(`Dog ${name} doesn´t exist`)
        }
    }
}

export const postDog= (payload)=> {
    return async function(dispatch){
        let newDog= await axios.post("http://localhost:3001/dogs", payload);
        return newDog
    }
}
