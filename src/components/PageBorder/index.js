import React from 'react'
import { useLocation } from 'react-router-dom'
import './index.sass'
export const PageBorder = () => {
  let location = useLocation();
  console.log({location})
  let borderClassRep = (location.pathname==='/')
  ? ['borders-top', 'borders-right', 'borders-left', 'borders-bottom']
  : ['borders-top']
  return (
    <div className="borders">
      {borderClassRep.map((cN, i) => {
        return <div key={i} className={cN}></div>
      })}
    </div>
  )
}
