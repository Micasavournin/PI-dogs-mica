import axios from "axios";
import { GET_DOGS, DOG_DETAIL, CLEAN_DETAIL, GET_TEMPERAMENTS, ORDER_BY_NAME, ORDER_BY_WEIGHT, GET_DOG_NAME, SET_FILTER_DOG, FILTER_DOG, ORDER_BY_AV_WEIGHT} from "./actionTypes";

//Las funciones que tienen que hacer peticiones a la api o a un servidor son funciones asincronicas por que tienen q esperar a q se termine de realizar la peticion para poder seguir con lo siguiente, estas funciones asincronicas reciben un dispatch como parametro por que se esta utilizando redux-thunk para manejar el estado de la aplicacion 

// En Redux, las acciones son objetos simples que describen un cambio en el estado de la aplicación. Para realizar cambios en el estado, se deben enviar estas acciones al store mediante la función dispatch.

// Con redux-thunk, se pueden enviar funciones que contengan lógica asíncrona en lugar de acciones simples. Cuando se llama a una acción asíncrona, en lugar de enviar un objeto de acción al store, se envía una función que toma dispatch como argumento y la invoca con el objeto de acción una vez que se completa la operación asíncrona.

//REDUX NO PERMITE QUE UNA FUNCION SEA ASYNC por eso retorna otra funcion ASYNC q es la q hace la peticion a la api 
export const getDogs = ()=> { 
    return async function(dispatch){ //funcion asincronica por q tiene q hacer una llamada al servidor para traer la info
        const info= await axios("http://localhost:3001/dogs")
        return dispatch({ //se utiliza dispatch para despachar la action al reducer con su type y payload con la info guardad en la variable
            type: GET_DOGS,
            payload: info.data
        })
    }
} // En este caso, la función getdogs es asíncrona porque está utilizando axios para hacer una llamada a una API y esperando una respuesta. Cuando se recibe la respuesta, se llama a dispatch con un objeto de acción que contiene el tipo GET_DOGS y los datos recibidos de la API en la propiedad payload. Esto permite actualizar el estado de la aplicación con los datos recibidos de la API.

export const getdogDetail=(id)=>{ //esta funcion se define como una funcion asincronica lo q significa que puede esperar a que se complete una operacion antes de continuar con la siguiente. Recibe como parametro un id
    return async function(dispatch){ //esta funcion es la q realmente hace la peticion al servidor
        let json= await axios.get(`http://localhost:3001/dogs/${id}`) //me guardo en mi varable json la respuesta de la llamada al servidor
        return dispatch({ //retornamos el action type (que lo necesita el reducer para saber a q caso ir) y el payload con toda la info guardada 
            type: DOG_DETAIL, 
            payload: json.data //retorno el payload con la variable json.data q contiene el detalle del perro
        })
    }
}

export const cleanDetail=()=>{
    return{type: CLEAN_DETAIL}// me borra el estado detail cuando se desmonta el componente detail
}

export const getTemperaments=()=>{
    return async function (dispatch) { 
        let json = await axios.get("http://localhost:3001/temperaments"); //se guarda el resultado de lallamada a la api en una variable json
        let listOfTemperaments = json.data.map(temp => temp.name)// le hago un map a lo q me vino de la api y se me guardo en mi variable json y me guardo todos los nombres de cada uno de los temperamentos en mi variable listOfTemperaments 
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: listOfTemperaments //retorno payload donde le pase mi variable cn todos los nombres
        });
}} 

export const getDogName= (name)=> { //se define la funcion 
    return async function (dispatch){ // se define una función asíncrona que recibe como parámetro dispatch. Esta función asíncrona es la que realmente realiza la petición al servidor.
        try { //se utiliza el operador try-catch. Esto se hace para manejar posibles errores que puedan ocurrir durante la ejecución de la función.
        let json = await axios (`http://localhost:3001/dogs?name=${name}`) //se almacena el resultado de la peticion en la variable json
        return dispatch({ //se utiliza dispatch para despachar la action al reducer con su type
            type: GET_DOG_NAME, 
            payload: json.data //y su payload con la info del servidor guardada 
        })
        } catch (error) { //si ocurre un error entra el catch y me tira un alert q me dice q el perro no existe 
        alert(`Dog ${name} doesn´t exist`)
        }
    }
}

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

export const orderByAvWeight= (payload)=> {
    return {
        type: ORDER_BY_AV_WEIGHT,
        payload
    }
}


export const setFilter = (perroFiltrado = undefined, filterTemp = undefined) => { //recibe dos parametros opcionales, significa que uno puede llegar con algun valor y el otro como undefined 
    return function(dispatch) { 
        dispatch({
            type: SET_FILTER_DOG,//se utiliza dispatch para despachar la action al reducer con su type
            payload: {perroFiltrado, filterTemp}}) //
        dispatch(Filter())
    }
}

export const Filter = () => {
    return {
        type: FILTER_DOG
    }
}



export const postDog= (payload)=> {
    return async function(dispatch){
        let newDog= await axios.post("http://localhost:3001/dogs", payload);
        return newDog
    }
}
