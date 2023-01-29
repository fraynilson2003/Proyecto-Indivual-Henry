import { NavLink } from "react-router-dom"
import "../../styles/videogame/NavBar.css"

export const NavBar = () => {
  return (
    <nav className='NavBar'>


      <div className="API_link">
        <NavLink to={`/`} className="link_api">API</NavLink>
      </div>
      
      <div className="container_search">
        <input type="text" placeholder="search"  className="search_input" />
        <div className="icon_search">🔍</div>
      </div>

        <div className="Henry_link">
          Henry
        </div>
    </nav>

  )
}
