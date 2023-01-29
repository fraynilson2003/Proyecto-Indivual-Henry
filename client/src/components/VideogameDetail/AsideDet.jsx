import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../styles/videogameDetail/AsideDet.css"

export const AsideDet = (props) => {

  let description = `${props.videogameID.description}`
  description.replace("<br/>", "<br/><br/>")

  let platform = (props.videogameID.platforms? props.videogameID.platforms.map(plt=>plt.name).join(', '):"")

  return (
    <div className='container_aside_det'>
      <NavLink to={`/videogames`} className={"button_home"}>
        <p className='p_button'>Home</p>
      </NavLink>

      <h3>{props.videogameID.name}</h3>
     {/* description */}
      <div className='description' dangerouslySetInnerHTML={{ __html: description}} />

      {/* Rating */}
      <div className='detail_platform'>
        <p className='detail_property_platform'>Rating:</p>
        <p className='platform_date'>{props.videogameID.rating}</p>
      </div>

     {/* relesead */}
      <div className='detail_platform'>
        <p className='detail_property_platform'>Released:</p>
        <p className='platform_date'>{props.videogameID.released}</p>
      </div>



      {/* Platform */}
      <div className='detail_platform'>
        <p className='detail_property_platform'>Platforms:</p>
        <p className='platform_date'>{platform}</p>
      </div>

        



    </div>
  )
}
