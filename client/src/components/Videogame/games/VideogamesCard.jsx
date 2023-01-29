import React from 'react'
import { NavLink } from 'react-router-dom'
import img_sin_perfil from "../../../images/sin-perfil.jpg"

export const VideogamesCard = (props) => {

  let generCort = props.genres.slice(0,3)

  return (
    <div className='container_individual_videogame'>

      <NavLink to={`/videogames/${props.id}`} className="nav_link_detail container_img">
        {/*<div className='container_img'>*/}
            {props.image == "NOT" || props.image == "na"?
            <img src={img_sin_perfil} alt={props.name}/>:
            <img src={props.image} alt={props.name} />
            }
         {/*</div>*/}
      </NavLink> 


      <p>{props.name}</p>

      <NavLink to={`/videogames/${props.id}`} className='container_individual_geners nav_link_detail'>
        {generCort.length && generCort.map((ge, index)=>
          <div key={index} className='gener_videogame'>{ge.name}</div>
          )}
      </NavLink>
    </div>
  )
}
