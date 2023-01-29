import React, { useEffect } from 'react'
import { useState } from 'react'
import "../../../../styles/videogame/games/BarraDeEleccion.css"


export const BarraDeEleccion = (props) => {
  //estado para despliegue de opciones
  let [stateDespliegue, setStateDespliegue] = useState(false)
  let [verifyCheck, setVerifyCheck] = useState([])

  let generos = props.allGeners.slice(1)

  let actualizarDespliegue = ()=>{
    setStateDespliegue(!stateDespliegue)
  }

  //forms

  let handlePropierties = (eve)=>{
    const selectedOption = eve.target.value;
    const prop = eve.target.name;

    console.log("Entra a handlePropierties");

    if (eve.target.checked) {
      setVerifyCheck([...verifyCheck, selectedOption])


      props.setFormState({ 
        ...props.formState,
        [prop]: [...props.formState[props.buttonGroup], selectedOption]
      })
      console.log(props.formState[props.buttonGroup]);

    } else {
      let filt = verifyCheck.filter(option => option != selectedOption)
      setVerifyCheck(filt)

      props.setFormState({ 
        ...props.formState,
        [prop]: props.formState[props.buttonGroup].filter(option => option != selectedOption)
      })
    }
  }

 
  useEffect(()=>{

  },[props.formState[props.buttonGroup]])

  return (
    <div className="container_barra_selected">

      <div className={stateDespliegue?"container_options_selected active" : "container_options_selected"}>
        {generos.length && generos.map((opt, index)=>
          <div key={index} className="option_select">
            <input type="checkbox" className="input_check"
              id={opt.name} name={props.buttonGroup} value={opt.id}  
              /*checked={}*/
              onChange={handlePropierties}/>
            <label htmlFor={opt.name} >{opt.name}</label>
          </div>
        )}
      </div>

      <div className="despegable" onClick={actualizarDespliegue}>
        SELECT
      </div>

    </div>          
  )
}
