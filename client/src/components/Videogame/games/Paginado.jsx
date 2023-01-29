import React, { useState } from 'react'
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';

export const Paginado = ({stateRender, videogamesNumPage, controllPage}) => {

  let newSTate = []
  for (let i = 1; i <= Math.ceil(stateRender.length/videogamesNumPage); i++) {  
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
