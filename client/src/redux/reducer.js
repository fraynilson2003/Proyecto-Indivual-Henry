import {
    GET_ALL_VIDEOGAMES,
    GET_ID_VIDEOGAME,
    GET_NAME_VIDEOGAME,
    SET_VIDEOGAME_RESULT,
    GET_ALL_GENERS,
    GET_ALL_PLATFORMS,
    PUT_STATE_REGISTER,
    ACTUALIZAR_ALL_VIDEOGAMES} from "./actions"
    
import {
    SET_FILTER_ORDER,
    SET_FILTER_ORIGIN,
    SET_FILTER_GENER,
    FILTER_VIDEOGAMES,} from "./actionsFilter"
  
  const initialState = {
    actualizarAllVideogames: "Random",

    allVideogames: [],
    videogameByID: {},
    allVideogamesFilter: [],
    searchVideogame:[],

    allGeners: [],
    allPlatforms: [],

    resultCreateVideogame: false,

    detailVideogame: {},

    stateCompRegister: false,


    order: "a - z",
    FilterOrigin: "All",
    FilterGener: 0
  }
  
  export const rootReducer = (state = initialState, action)=>{
    switch (action.type) {
      //actualizar allVideogames
      case ACTUALIZAR_ALL_VIDEOGAMES:
        return{
          ...state,
          actualizarAllVideogames: action.payload
        }
      //RESULTADO DE creacion videojuego
      case SET_VIDEOGAME_RESULT:
        return{
          ...state,
          resultCreateVideogame: action.payload
        }

      case PUT_STATE_REGISTER:
        return{
          ...state,
          stateCompRegister: action.payload
        }
      // GET
      case GET_ALL_VIDEOGAMES:
        return{
          ...state,
          allVideogames: action.payload,
        }

      case GET_ID_VIDEOGAME:
        return{
          ...state,
          videogameByID: action.payload
        }

      case GET_ALL_GENERS:
        return{
          ...state,
          allGeners: action.payload
        }

      case GET_ALL_PLATFORMS:
        return{
          ...state,
          allPlatforms: action.payload
        }

    // APLICACION DE FILTROS
      case FILTER_VIDEOGAMES:{
        return{
          ...state,
          allVideogamesFilter: [...action.payload]
        }
      }
     // FILTROS

      case SET_FILTER_ORDER:
        return{
          ...state,
          order: action.payload
        }

      case SET_FILTER_ORIGIN:
        return{
          ...state,
          FilterOrigin: action.payload
        }

      case SET_FILTER_GENER: {
        return{
          ...state,
          FilterGener: action.payload
        }       
      }


      default:
        return {
          ...state
        }
    }
  }