import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllVideogames, getNameVideogame, putStateSearchName } from "../../redux/actions"
import { setFilterName } from "../../redux/actionsFilter"
import "../../styles/videogame/NavBar.css"

export const NavBar = () => {
  //redux
  let dispatch = useDispatch()
  let searchVarName = useSelector(state=>state.searchName)

  let searchName = (eve)=>{
    let name = eve.target.value
    dispatch(setFilterName(name))
    
    if(name.length >= 3 ){
      dispatch(getNameVideogame(name))
      dispatch(putStateSearchName(true))
    }else{
      dispatch(putStateSearchName(false))
    }
  }

  return (
    <nav className='NavBar'>


      <div className="API_link">
        <NavLink to={`/`} className="link_api">API</NavLink>
      </div>
      
      <div className="container_search">
        <input type="text" value={searchVarName} placeholder="search" className="search_input" onChange={searchName}/>
        <div className="icon_search">🔍</div>
      </div>

        <div className="Henry_link">
          Henry
        </div>
    </nav>

  )
}
