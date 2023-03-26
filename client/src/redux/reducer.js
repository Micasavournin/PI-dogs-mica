import { GET_DOGS, GET_TEMPERAMENTS, DOG_DETAIL, CLEAN_DETAIL, FILTER_BY_TEMPER, FILTER_CREATED, ORDER_BY_NAME,ORDER_BY_WEIGHT, GET_DOG_NAME, POST_DOG, FILTER_DOG, SET_FILTER_DOG } from "./actionTypes"

const initialState = {
    dogs: [], //this would be like a current
    dogDetail: {},
    temperaments: [],
    allDogs: [], //this is a copy of all dogs which endures
    perroFiltrado:"all",
    filterTemp:"all"
}

const reducer = (state = initialState, action) => {
    let aux = []; //auxiliary
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                dogDetail: {}
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
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
            let filter
            if(state.perroFiltrado === 'all') {
                filter = state.filterTemp === 'all'
                ? 
                state.allDogs
                :
                state.allDogs.filter(dog =>{
                    if(!dog.temperament) return undefined; 
                    return dog.temperament.split(", ").includes(state.filterTemp)    
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
            let ordered= action.payload === "a-z" ? state.dogs.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                }
                return 0;
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
                dogs: ordered
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