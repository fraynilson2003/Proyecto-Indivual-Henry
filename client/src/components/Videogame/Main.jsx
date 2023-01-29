import React from 'react'
import "../../styles/videogame/Main.css"
import { Aside } from './Aside'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import { Videogames } from './games/Videogames'
import { useSelector } from 'react-redux'
import { CreateVideogame } from './games/form/CreateVideogame'

export const Main = () => {
    //redux renderRegister
    let stateRenderRegister = useSelector(state => state.stateCompRegister)


  return (
    <div className='section_videogame'>
        <NavBar/>
        <Aside/>
        <Videogames/>
        <Footer/>

        {stateRenderRegister && 
          <CreateVideogame/>
        }

    </div>



  )
}
