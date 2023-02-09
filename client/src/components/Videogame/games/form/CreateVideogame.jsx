import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarAllVidegames, actualizarResultCreate, getAllPlatforms, getAllVideogames, postRegisterVideogame, postStateForm, putStateRegister } from '../../../../redux/actions'
import "../../../../styles/videogame/games/CreateVideogames.css"
import { BarraDeEleccion } from './BarraDeEleccion'

export const CreateVideogame = () => {
  //actulizar render
  let actualizarVideogames = useSelector(state => state.actualizarAllVideogames)


  //redux para render de componente registro
  let resultCreateVideo = useSelector(state => state.resultCreateVideogame)
  let [formValidation, setFormValidation] = useState(false)

  const dispatch = useDispatch()
  //estado para formulario
  let formStateRe = useSelector(state => state.formStateRedux)

  let handleForm = (eve)=>{
    const property = eve.target.name
    const value = eve.target.value

    dispatch(postStateForm({
      ...formStateRe,
      [property]:value
    }))
  }

  const handleFormFloat = (eve) => {
    const property = eve.target.name
    const value = eve.target.value
    const decimalCount = (value.split('.')[1] || []).length;

    const  num = Number(value)

    if (decimalCount > 1 || num > 5 || num < 0) {
  
    }else{
      dispatch(postStateForm({
        ...formStateRe,
        [property]:Number(value)
      }))
    }
  }
  

  //enviar formulario
  let handleSubitForm = (eve)=>{
    eve.preventDefault();

    if(formStateRe.name && formStateRe.idGener.length && formStateRe.idPlatform.length
      && formStateRe.rating && formStateRe.description && formStateRe.released){
        dispatch(postRegisterVideogame(formStateRe))
        dispatch(actualizarAllVidegames())
        
        dispatch(postStateForm({
          name: "",
          idGener: [],
          idPlatform: [],
          released: "",
          background_image: "",
          rating: "",
          description: ""
        }))

        setFormValidation(false)

      }else{
        setFormValidation(true)
      }
  }

  let renderMessage = ()=>{

  }
  
  //////redux
  let allGeners = useSelector(state => state.allGeners)
  let allPlatform = useSelector(state=> state.allPlatforms)

  let stateRenderRegister = useSelector(state => state.stateCompRegister)

  let actCompRegis = ()=>{
    dispatch(putStateRegister(stateRenderRegister))
    dispatch(postStateForm({
      name: "",
      idGener: [],
      idPlatform: [],
      released: "",
      background_image: "",
      rating: "",
      description: ""
    }))
    dispatch(actualizarResultCreate())
  }

 
  useEffect(()=>{
    dispatch(getAllPlatforms())
  },[])

  useEffect(()=>{
    dispatch(getAllVideogames())
  },[actualizarVideogames])

  return (
    <div className='container_register_videogame'>
      <div className='register_videogame'>
        {/*Encabezado*/}
        <div className='register_encabezado'>
          <p>REGISTRAR</p>
        </div>

        {/*Boton cerrar */}
        <div className='button_cerrar' onClick={actCompRegis}>
          X
        </div>
        
        {/* Message */}
        {formValidation && [
          <p key={1} className='create_message'>Rellene todos los espacios por favor</p>
        ]}

        {formValidation == false && resultCreateVideo == true && [
          <p key={2} className='create_videogame_message'>Videogame creado</p>
        ]}


        <form onSubmit={handleSubitForm} action="" className='formulario_register_videogame'>

          <div className='file_option'>
            <p className='name_input'>Nombre</p>
            <input type="text" name={"name"} value={formStateRe.name} className='input_form' onChange={handleForm} />
          </div>

          {/* todos los generos */}
          <div className='file_option'>
            <p className='name_input'>Geners</p>
            <BarraDeEleccion
              allGeners={allGeners}
              buttonGroup={"idGener"}
              />
          </div>

          {/* todas las plataformas*/}
          <div className='file_option'>
            <p className='name_input'>Platforms</p>
            <BarraDeEleccion
              allGeners={allPlatform}
              buttonGroup={"idPlatform"}
              />
          </div>

          {/* fecha */}
          <div className='file_option'>
            <p className='name_input'>Fecha</p>
            <input type="date" className='input_form' name={"released"} value={formStateRe.released} onChange={handleForm} />
          </div>


          <div className='file_option'>
            <p className='name_input'>URL imagen</p>
            <input type="text" className='input_form' name={"background_image"} value={formStateRe.background_image} onChange={handleForm} />
          </div>

          <div className='file_option'>
            <p className='name_input'>Rating</p>
            <input type="number" step="0.1" className='input_form' placeholder="entre 0 y 5"
              name={"rating"} value={formStateRe.rating} onChange={handleFormFloat} />
              
          </div>

          <div className='file_option textarea'>
            <p className='name_input'>Descripcion</p>
            <textarea type="text" name={"description"} value={formStateRe.description} onChange={handleForm} />
          </div>

          <button className='button_create' type='submit' onClick={renderMessage}>
            CREAR
          </button>


        </form>


      </div>
    </div>
  )
}
