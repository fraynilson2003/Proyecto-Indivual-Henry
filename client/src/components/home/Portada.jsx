import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../styles/home/Portada.css"

//imagens
import imgMain from "../../images/videogame.png"
import img2 from "../../images/img2.svg"


export const Portada = () => {
  

return (
  <div className='wrp'>
    <div className='portada'>
      <div className='info'>
        <div className='container_text'>
            <p>Videogames</p>
            <NavLink to={`/videogames`} className="link_home">Home</NavLink>
        </div>
      </div>


        <div className='container_img'>
          <img className='image_portada' src={imgMain} alt="mario" />
        </div>


    </div>

    <div className='footer'>

    </div>


    <div className='curveado'>
      <img src={img2} alt="" className='img-svg' />
    </div>

  </div>
  )
}
