import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGeners, putOrderVideogames, putStatePaginado, putStateRegister } from "../../redux/actions";
import { setFilterGener, setFilterOrder, setFilterOrigin } from "../../redux/actionsFilter";
import "../../styles/videogame/Aside.css"

export const Aside = () => {
  //////redux
  const dispatch = useDispatch()
  let allGeners = useSelector(state => state.allGeners)

  //ESTADO Y METODO PARA RENDER COMPONENT REGISTER VIDEOGAME
  let stateRenderRegister = useSelector(state => state.stateCompRegister)

  let actCompRegis = ()=>{
    dispatch(putStateRegister(stateRenderRegister))
  }



  //ESTADOR PARA DESPLEIGUE OPCIONES
  let [optionOrder, setOptionOrder] = useState(true)
  let [optionOrigin, setOptionOrigin] = useState(false)
  let [optionGener, setOptionGener] = useState(false)

 //metodos para cambiar el estado de Ocultar opciones
  let stateOptOrder = ()=>{
    setOptionOrder(!optionOrder)
  }
  let stateOptOrigin = ()=>{
    setOptionOrigin(!optionOrigin)
  }
  let stateOptGener = ()=>{
    setOptionGener(!optionGener)
  }

  //ESTADOR PARA VALORES DE OPCIONES
  let orderValue = useSelector(state => state.order)
  let originValue = useSelector(state => state.FilterOrigin)
  let generValue = useSelector(state => state.FilterGener)

  let LimpiarFiltros = ()=>{
    dispatch(setFilterOrder("a - z"))
    dispatch(setFilterOrigin("All"))
    dispatch(setFilterGener(0))

  }


  //metodos para modificar estos estados
  let actualizarOrderValue = (e)=>{
    console.log(e.target.value);
    dispatch(setFilterOrder(e.target.value))
    dispatch(putStatePaginado(1))

  }

  let actualizarOriginValue = (e)=>{
    console.log(e.target.value);
    dispatch(setFilterOrigin(e.target.value))
    dispatch(putStatePaginado(1))

  }

  let actualizarGenerValue = (e)=>{
    console.log(e.target.value);
    dispatch( setFilterGener(e.target.value))
    dispatch(putStatePaginado(1))

  }

  // Arrays para opciones de filtro
  let orderVideogames = [
    {id : 1, name: "a - z"},
    {id : 2, name: "z - a"},
  ]

  let originData = [
    {id: 1, name: "All"},
    {id: 2, name: "API"},
    {id: 3, name: "database"}
  ]

  //metodos para modificar estados redux que aplicaran filtro
  let filterABC = (name)=>{
    dispatch(putOrderVideogames(name))
  }



  useEffect(()=>{
    dispatch(getAllGeners())
  },[])

  

 

  return (
    <aside className='container_filtros'>
      {/*New game */}
      <div className="new_game">
        <p className="button_newGame" onClick={actCompRegis}>NEW GAME</p>
      </div>
      {/* TITULO */}
      <div className="container_geners">
        <p className="geners_titulo_general"></p>
      </div>

      <div onClick={LimpiarFiltros}>
        Limpiar filtros
      </div>


      {/* ALFABETICAMENTE */}
      <div className="container_geners">
    
        <div className="select_box">
          <div className={optionOrder?"option_container active":"option_container"}>
            {orderVideogames.length && orderVideogames.map(opt=>
              <div key={opt.id} className="option">
                <input type="radio" checked={opt.name == orderValue} className="radio" id={opt.name} name="button_ABC" value={opt.name} onChange={actualizarOrderValue}/>
                <label htmlFor={opt.name} className="label">{opt.name}</label>
              </div>
            )}

            {/* <div className="option">
              <input type="radio" className="radio" id="automoviles" name="gener" />
              <label htmlFor="automoviles">automoviles  </label>
            </div> */}
          </div>

          <div className="selected" onClick={stateOptOrder}>
            ORDENAR
          </div>

        </div>

      </div>

      {/*ORIGEN*/ }
      <div className="container_geners">
        <div className="select_box">

          <div className={optionOrigin?"option_container active":"option_container"}>
            {originData.length && originData.map(opt=>
              <div key={opt.id} className="option">
                <input type="radio" checked={opt.name == originValue} className="radio" id={opt.name} name="button_database" value={opt.name} onChange={actualizarOriginValue} />
                <label htmlFor={opt.name} >{opt.name}</label>
              </div>
            )}
          </div>

          <div className="selected" onClick={stateOptOrigin}>
            BASE DE DATOS
          </div>

        </div>
      </div>

      {/*Generos*/ }
      <div className="container_geners">

        <div className="select_box">

          <div className={optionGener?"option_container active":"option_container"}>
            {allGeners.length && allGeners.map(opt=>
              <div key={opt.id} className="option">
                <input type="radio" checked={opt.id == generValue} className="radio" id={opt.name} name="button_gener" value={opt.id} onChange={actualizarGenerValue} />
                <label htmlFor={opt.name} >{opt.name}</label>
              </div>
            )}
          </div>

          <div className="selected" onClick={stateOptGener}>
            GENEROS
          </div>

        </div>          

      </div>

  


    </aside>
    )
}
