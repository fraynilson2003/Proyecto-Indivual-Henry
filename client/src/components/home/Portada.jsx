import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getAllVideogames } from '../../redux/actions'
import { NavLink } from 'react-router-dom'
import { CardPrueba } from './CardPrueba'
import "../../styles/home/Portada.css"

//imagens
import img1 from "../../images/img1.svg"
import img2 from "../../images/img2.svg"


export const Portada = () => {
  

return (
  <div className='wrp'>
    <div className='portada'>
    </div>

    <div className='contenido'>
      <div className='info'>
        <h1>API par&aacute; <br /> Gamers!</h1>
        <NavLink to={`/videogames`} className="link_home">Home</NavLink>
      </div>
    </div>

    <div className='curveado'>
      <img src={img2} alt="" className='img-svg' />
    </div>

  </div>
  )
}
