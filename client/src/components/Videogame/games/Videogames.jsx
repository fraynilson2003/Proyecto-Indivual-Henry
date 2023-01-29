import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ordenadorABC, ordenadorGener, ordenadorOrigin } from "../../../helpers/OrdenadorABC"
import { getAllVideogames } from "../../../redux/actions"
import "../../../styles/videogame/games/Videogames.css"
import { Paginado } from "./Paginado"
import { VideogamesCard } from "./VideogamesCard"

export const Videogames = () => {
  //estado de actualizarAllVideogames
  let actualizarVideogames = useSelector(state => state.actualizarAllVideogames)



  //redux allVideogames
  const dispatch = useDispatch()
  let stateRender = useSelector(state => state.allVideogames)
  let allVideogames = useSelector(state => state.allVideogames)



  //comprobamos cual estado vamos a renderizar || FILTRADO O TODO 
  let stateOrderFilter = useSelector(state => state.order)
  let stateOriginFilter = useSelector(state => state.FilterOrigin)
  let stateGenerFilter = useSelector(state => state.FilterGener)
 
  //Filtrado
  stateRender = ordenadorABC(stateRender, stateOrderFilter)
  stateRender = ordenadorOrigin(stateRender, stateOriginFilter)

  stateRender = ordenadorGener(stateRender, stateGenerFilter)
  
  //PAGINACION
  let [currentPage, setCurrentPage] = useState(1)
  let [videogamesNumPage, setVideogamesPage] = useState(15)

  let indexOfLastVideogames = currentPage * videogamesNumPage //15
  let indexOfFirstVideogames = indexOfLastVideogames - videogamesNumPage //0

  //estado que se renderizara
  let currentVideogames = stateRender.slice(indexOfFirstVideogames, indexOfLastVideogames)

  


  let controllPage = (numPage)=>{
    console.log(numPage)
    setCurrentPage(numPage)
  }

  useEffect(()=>{
    dispatch(getAllVideogames())

  },[])

  //actualizar allVideogames
  useEffect(()=>{
    dispatch(getAllVideogames())
  },[actualizarVideogames])



  //paginado

  return (
    <div className='container_videogames'>
      <p className="title_general">Videogames</p>

      {/* Paginado */}
      <div className="container_paginado">
        <Paginado
          stateRender = {stateRender}
          videogamesNumPage = {videogamesNumPage}
          controllPage = {controllPage}
        />
      </div>

      {/* VideoGAmes ALL */}
      <div className="container_all_videogames">
       {currentVideogames.length? currentVideogames.map((vid, index)=>
          <VideogamesCard
            key={index}
            image={vid.background_image}
            name={vid.name}
            genres={vid.genres}
            id={vid.id}/>
        ): 
        <div className="videogames_cargando">Cargando...</div>
        }

      </div>
    </div>

  )
}
