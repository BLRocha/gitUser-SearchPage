import React from 'react'

const Ul = ({ btnName, handler , checked}) => (
  <li className={`${btnName}Nav ${checked}`} onClick={handler} >
    {btnName}
  </li>
)

export default Ul