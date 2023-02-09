import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getVideogameByID } from '../../redux/actions'
import "../../styles/videogameDetail/VideogameDetail.css"
import { AsideDet } from './AsideDet'
import { FooterDet } from './FooterDet'

export const VideogameDetail = () => {
  //sacamos id de la ruta
  let {vidID} = useParams()

  //redux
  let dispatch = useDispatch()
  let videogameID = useSelector(state=>state.videogameByID)

  useEffect(()=>{
    dispatch(getVideogameByID(vidID))
  },[])

  return (
    <section className='section_detail_videogame'>
      <AsideDet
      videogameID={videogameID}/>

      <div className='right_position'>
        <div className='container_img_fond'>
          <img  src={videogameID.background_image} alt={videogameID.name}/>
        </div>

        <h2>GENEROS</h2>

        <div className='detail_generos'>
          {videogameID.genres && videogameID.genres.map(vid=>
            <p className='p_detail_generos'>{vid.name}</p>
            )}
        </div>
      </div>


    </section>
  )
}
