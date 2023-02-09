import React from 'react'


export const Paginado = ({stateRender, videogamesNumPage, controllPage}) => {
  let longVid

  if (stateRender.length){
    longVid = stateRender.length
  }else{
    longVid = 15
  }

  let newSTate = []
  for (let i = 1; i <= Math.ceil(longVid/videogamesNumPage); i++) {  
    newSTate.push(i)
  }


  return (
  <>
    {newSTate.length? newSTate.map(pag=>
      <div className='page_number' onClick={()=>controllPage(pag)} key={pag}>
        {pag}
      </div>
    ):
      <div></div>
    }
  </>
  )
}
