import { GET_DOGS, GET_TEMPERAMENTS, DOG_DETAIL, CLEAN_DETAIL, ORDER_BY_NAME,ORDER_BY_WEIGHT, GET_DOG_NAME, POST_DOG, FILTER_DOG, SET_FILTER_DOG, ORDER_BY_AV_WEIGHT } from "./actionTypes"

const initialState = { //declaro mi estado global inicial
    dogs: [], //estado global de todos los perros
    dogDetail: {}, //estado global del detalle de los perros
    temperaments: [], //estado de los temperamentos 
    allDogs: [], //copia de dogs
    perroFiltrado:"all",
    filterTemp:"all"
}

// Un reducer es una función que toma el estado anterior y una acción y devuelve un nuevo estado actualizado. En este caso, el estado anterior es el estado actual del store de Redux.

const reducer = (state = initialState, action) => { //declaro la constante reducer y le paso dos parametros, el estado de la store q lo igualo al inicial State y las action q me llegan
    let aux = []; // delcaro la variable auxiliar que me va a ayudar con el case orderByWeight
    switch(action.type) { //delaro el switch/case y le paso como parametro el type de la action para q el reducer sepa donde tiene q trabajar
        case GET_DOGS: //este es el caso donde la action me trae todos los perros de la api
            return {
                ...state, //me retorna una copia del estado global para no pisarlo
                dogs: action.payload, //se me actualiza el estado dogs con la info q trae el payload de la action (info.data) que son todos los perros de la api
                allDogs: action.payload //hago lo mismo con el estado allDogs
            }
        case DOG_DETAIL: //este es el caso donde me traigo un perro segun el id 
            return {
                ...state, //hago la copia del estado global
                dogDetail: action.payload //me guardo en mi estado dog detail lo que me guarde en el payload de la action (json.data) json es la variable donde guarde lo q me vino d la api, igual lo q me vino desde la api vino en formato json 
            }
        case CLEAN_DETAIL: //caso donde limpio mi estado dogDetail cuando se me desmonta el componnete
            return{
                ...state,
                dogDetail: {} //retorno a dog detail como un objeto vacio para que no se me quede guardada la info del perro anterior, se hace en el return del useEffect para q se dispache la action cuando se desmonte el componente 
            }
        case GET_TEMPERAMENTS: //caso donde me traigo todos los nombres d os temperamentos en un array 
            return {
                ...state, //hago la copia del estado
                temperaments: action.payload, //me guardo en mi estado temperamentos lo q me guarde en mi payload (listOfTemperaments)
            }
        case SET_FILTER_DOG: {
            if(action.payload.perroFiltrado) {
                return {
                    ...state,
                    perroFiltrado: action.payload.perroFiltrado
                }
            } else if(action.payload.filterTemp) {
                return {
                    ...state,
                    filterTemp: action.payload.filterTemp
                }
            } else {                
                return {
                    ...state,
                }
            }
        }
        case FILTER_DOG:
        {
            let filter //declaro mi variable filter pero no la inicializo
            if(state.perroFiltrado === 'all') { //se fija si el estado perroFiltrado es "all"
                filter = state.filterTemp === 'all' //se fija si el estado filterTemp es "all"
                ? 
                state.allDogs //si es "all" me traigo el estado allDogs como esta 
                :
                state.allDogs.filter(dog =>{ //si no es "all" hago un filter de cada perro 
                    if(!dog.temperament) return undefined; //y me pregunto si dog tiene un valor para el atributo temperament, si no tiene, retorno undef, si tiene, se verifica si el temperamento del perro incluye el temperamento seleccionado en el filtro state.filterTemp.
                    return dog.temperament.split(", ").includes(state.filterTemp) //y como lo hago? hago un split de la cadena de caracteres de dog.temperamentos para que se me convierta en un array de strings separados x una coma y despues me pregunto si ese array incluye el temperamento seleccionado en el filterTemp
                })
            } else if(state.perroFiltrado === 'api') {
                filter = state.filterTemp === 'all'
                ? 
                state.allDogs.filter(dog => !dog.createInDb)
                :
                state.allDogs.filter(dog =>{
                    if(!dog.temperament) return undefined; 
                    return dog.temperament.split(", ").includes(state.filterTemp) && !dog.createInDb
                })
            } else if(state.perroFiltrado === 'createInDb') {                
                filter = state.filterTemp === 'all'
                ? 
                state.allDogs.filter(dog => dog.createInDb)
                :
                state.allDogs.filter(dog =>{
                    if(!dog.temperament) return undefined; 
                    return dog.temperament.split(", ").includes(state.filterTemp) && dog.createInDb
                })
            }
            return{
                ...state, 
                dogs: filter
            }
        }
        case ORDER_BY_NAME:
            let order= action.payload === "a-z" ? state.dogs.sort((a, b) => { //metodo sort recibe una funcion de comparacion como argumento q recibe dos parametros y que compara dos elementos del array y devuelve un valor que indica si el primer elemento es menor, mayor o igual al segundo elemento 
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1; // si retorna 1 significa q a es mayor a b y se coloca adelante de b
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1; //si retorna -1 significa q b es mayor q a y se pone b antes q a 
                }
                return 0; // si retorna 0 no se cambia el orden 
            }) : state.dogs.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: order //se devuelve el estado dogs con lo q contiene la variablen order 
            }
        case ORDER_BY_WEIGHT: 
            if (action.payload === "min") {
                aux = state.dogs.sort((dogA, dogB) => {
                    if(dogA.weightMin < dogB.weightMin) return -1;
                    if(dogA.weightMin > dogB.weightMin) return 1;
                    return 0;
                })
            } else if (action.payload === "max") {
                aux = state.dogs.sort((dogA, dogB) => {
                    if(dogA.weightMax > dogB.weightMax) return -1;
                    if(dogA.weightMax < dogB.weightMax) return 1;
                    return 0;
                })
            } else {
                console.log("error")
            }
            return{
                ...state,
                dogs: aux
            }
        case ORDER_BY_AV_WEIGHT: 
        if (action.payload === "Asc") {
            aux = state.dogs.sort((dogA, dogB) => {
                if(dogA.averageWeight < dogB.averageWeight) return -1;
                if(dogA.averageWeight > dogB.averageWeight) return 1;
                return 0;
            })
        } else if (action.payload === "Desc") {
            aux = state.dogs.sort((dogA, dogB) => {
                if(dogA.averageWeight > dogB.averageWeight) return -1;
                if(dogA.averageWeight < dogB.averageWeight) return 1;
                return 0;
            })
        } else {
            console.log("error")
        }
        return{
            ...state,
            dogs: aux
        }
        case GET_DOG_NAME:
            return {
                ...state,
                dogs: action.payload
            }
        
        case POST_DOG:
            return {
                ...state,
            }
            
        default:
            return {
                ...state,
    }
}
}
export default reducer;