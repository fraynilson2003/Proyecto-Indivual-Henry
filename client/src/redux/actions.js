import axios from "axios"
import { ordenadorABC } from "../helpers/OrdenadorABC"

export const PUT_STATE_REGISTER = "PUT_STATE_REGISTER"

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES"

export const GET_ID_VIDEOGAME = "GET_ID_VIDEOGAME"
export const GET_NAME_VIDEOGAME = "GET_NAME_VIDEOGAME"
export const PUT_STATE_SEARCH_NAME = "PUT_STATE_SEARCH_NAME"

export const SET_VIDEOGAME_RESULT = "SET_VIDEOGAME_RESULT"
export const ACTUALIZAR_ALL_VIDEOGAMES = "ACTUALIZAR_ALL_VIDEOGAMES"

export const GET_ALL_GENERS = "GET_ALL_GENERS"
export const GET_ALL_PLATFORMS = "GET_ALL_PLATFORMS"

export const PUT_ORDER = "PUT_ORDER"
export const PUT_STATE_PAGINADO = "PUT_STATE_PAGINADO"


export const DELETE_MOVIE = "DELETE_MOVIE"
export const FILTER_GENERO = "FILTER_GENERO"

export const POST_STATE_FORM = "POST_STATE_FORM"


/* ********************************* */
export let putStatePaginado = (pag)=>{
  return{
    type:PUT_STATE_PAGINADO,
    payload: pag
  }
}

export let putStateSearchName = (estado)=>{
  return{
    type:PUT_STATE_SEARCH_NAME,
    payload: estado
  }
}

export let actualizarResultCreate = ()=>{
  return{
    type:SET_VIDEOGAME_RESULT,
    payload: false
  }
}


export let actualizarAllVidegames = ()=>{
  return{
    type:ACTUALIZAR_ALL_VIDEOGAMES,
    payload: Math.random().toString(36).substr(2, 8)
  }
}

/********** POST ******************** */
export let postRegisterVideogame = (statement)=>async(dispatch)=>{
  console.log("LLEGa");
  try {
    let newVidGame = {
      newVideoGame: {
        name: statement.name,
        description: statement.description,
        rating: statement.rating,
        released: statement.released,
        background_image: statement.background_image
        },
      idGener: statement.idGener,
      idPlatform: statement.idPlatform
    }
    console.log(/*/////////*/);
    console.log(newVidGame);

    let result = await axios.post("http://localhost:3002/videogames", newVidGame)

    if(result.status == 200){
      console.log(result.status);
      return dispatch ({type:SET_VIDEOGAME_RESULT,payload: true})
      
    }
    console.log(result.status);
  } catch (error) {
    console.log("ERROR "+error);
    return dispatch ({type:SET_VIDEOGAME_RESULT,payload: false})

  }

}
export let postStateForm = (select)=>{
  return{
    type:POST_STATE_FORM,
    payload: select
  }
}

/*************** PUT ***************** */
export let putStateRegister = (active)=>{
  return{
    type:PUT_STATE_REGISTER,
    payload: !active
  }
}
/* GET */
export let getNameVideogame = (name)=>async(dispatch)=>{
  try {
    let result = await axios.get(`http://localhost:3002/videogames?name=${name}`)
    let res = result.data

    return dispatch({type: GET_NAME_VIDEOGAME, payload:res})
  } catch (error) {
    throw Error([error, "MALLLLLLLLLLLLLLLLL"])
  }
}

export let getVideogameByID = (id)=> async(dispatch)=>{
  try {
    let result = await axios.get(`http://localhost:3002/videogames/${id}`)


    return dispatch({type: GET_ID_VIDEOGAME, payload:result.data})
  } catch (error) {
    throw Error([error, "MALLLLLLLLLLLLLLLLL"])
  }
}

export let getAllVideogames = ()=> async(dispatch)=>{
  try {
    let result = await axios.get(`http://localhost:3002/videogames`)
    console.log(result.data.length);

    let res = ordenadorABC(result.data, "a - z")

    return dispatch({type: GET_ALL_VIDEOGAMES, payload:[...res]})
  } catch (error) {
    throw Error([error, "MALLLLLLLLLLLLLLLLL"])
  }
}

export let getAllGeners = ()=> async(dispatch)=>{
  try {
    let result = await axios.get("http://localhost:3002/genres")

    let res =  result.data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    res.unshift({name: "All", id: 0, image_background:""})

    //res.unshit({name: "All"})


    return dispatch({type: GET_ALL_GENERS, payload:res})
  } catch (error) {
    throw Error([error, "MALLLLLLLLLLLLLLLLL"])
  }
}

export let getAllPlatforms = () => async(dispatch)=>{
  try {
    let result = await axios.get(`http://localhost:3002/plataform`)

    /*let res = ordenadorABC(result.data, "a - z")*/

    result.data.unshift({name: "All", id: 0, image_background:""})


    return dispatch({type: GET_ALL_PLATFORMS, payload:[...result.data]})
  } catch (error) {
    throw Error([error, "MALLLLLLLLLLLLLLLLL"])
  }
  
}






export let putOrderVideogames = (order)=>{
  return{
    type:PUT_ORDER,
    payload: order
  }
}

export let setMovie = (movie) => {
  return{
    type:PUT_ORDER,
    payload: movie
  }
}
