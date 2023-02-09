import axios from "axios"
import { ordenadorABC, ordenadorGener, ordenadorOrigin } from "../helpers/OrdenadorABC"

export const SET_FILTER_ORDER = "SET_FILTER_ORDER"
export const SET_FILTER_ORIGIN = "SET_FILTER_ORIGIN"
export const SET_FILTER_GENER = "SET_FILTER_GENER"
export const SET_FILTER_NAME = "SET_FILTER_NAME"

//*********************************************************** */

export let setFilterName = (name)=>{
  return{
      type:SET_FILTER_NAME,
      payload: name
    }
}


export let setFilterOrder = (order)=>{
    return{
        type:SET_FILTER_ORDER,
        payload: order
      }
}

export let setFilterOrigin = (origin)=>{
    return{
        type:SET_FILTER_ORIGIN,
        payload: origin
      }
}

export let setFilterGener = (gener)=>{
    return{
        type:SET_FILTER_GENER,
        payload: gener
      }
}


  
