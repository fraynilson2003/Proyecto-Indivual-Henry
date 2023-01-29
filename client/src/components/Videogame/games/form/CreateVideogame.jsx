import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarAllVidegames, actualizarResultCreate, getAllPlatforms, getAllVideogames, postRegisterVideogame, putStateRegister } from '../../../../redux/actions'
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
  let [formState, setFormState] = useState({
    name: "",
    idGener: [],
    idPlatform: [],
    released: "",
    background_image: "",
    rating: "",
    description: ""
  })

  let handleForm = (eve)=>{
    const property = eve.target.name
    const value = eve.target.value

    setFormState({
      ...formState,
      [property]:value
    })
  }

  const handleFormFloat = (eve) => {
    const property = eve.target.name
    const value = eve.target.value
    const decimalCount = (value.split('.')[1] || []).length;

    const  num = Number(value)

    if (decimalCount > 1 || num > 5 || num < 0) {
  
    }else{
        setFormState({
          ...formState,
          [property]:Number(value)
        })
      }
    }
  

  //enviar formulario
  let handleSubitForm = (eve)=>{
    eve.preventDefault();

    let newVide = formState

    //corregimos los sting
    newVide.name = newVide.name.replace(/^\s+|\s+$/g, "")
    newVide.background_image = newVide.background_image.replace(/^\s+|\s+$/g, "")
    newVide.description = newVide.description.replace(/^\s+|\s+$/g, "")

    if(newVide.name && newVide.idGener.length && newVide.idPlatform.length
      && newVide.rating && newVide.description && newVide.released){
        dispatch(postRegisterVideogame(newVide))
        dispatch(actualizarAllVidegames())
        

        setFormState({
          name: "",
          idGener: [],
          idPlatform: [],
          released: "",
          background_image: "",
          rating: "",
          description: ""
        })

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
            <input type="text" name={"name"} value={formState.name} className='input_form' onChange={handleForm} />
          </div>

          {/* todos los generos */}
          <div className='file_option'>
            <p className='name_input'>Geners</p>
            <BarraDeEleccion
              allGeners={allGeners}
              buttonGroup={"idGener"}
              //estados
              formState={formState}
              setFormState={setFormState}/>
          </div>

          {/* todas las plataformas*/}
          <div className='file_option'>
            <p className='name_input'>Platforms</p>
            <BarraDeEleccion
              allGeners={allPlatform}
              buttonGroup={"idPlatform"}
              //estados
              formState={formState}
              setFormState={setFormState}/>
          </div>

          {/* fecha */}
          <div className='file_option'>
            <p className='name_input'>Fecha</p>
            <input type="date" className='input_form' name={"released"} value={formState.released} onChange={handleForm} />
          </div>


          <div className='file_option'>
            <p className='name_input'>URL imagen</p>
            <input type="text" className='input_form' name={"background_image"} value={formState.background_image} onChange={handleForm} />
          </div>

          <div className='file_option'>
            <p className='name_input'>Rating</p>
            <input type="number" step="0.1" className='input_form' placeholder="entre 0 y 5"
              name={"rating"} value={formState.rating} onChange={handleFormFloat} />
              
          </div>

          <div className='file_option textarea'>
            <p className='name_input'>Descripcion</p>
            <textarea type="text" name={"description"} value={formState.description} onChange={handleForm} />
          </div>

          <button className='button_create' type='submit' onClick={renderMessage}>
            CREAR
          </button>


        </form>


      </div>
    </div>
  )
}
