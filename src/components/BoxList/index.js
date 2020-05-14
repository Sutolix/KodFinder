import React from 'react'

import './box_list.css'

export default function BoxList ({structure, title}) {

  return (
    <div className='box_list'>

      <div>
        <div className='list-title standard_secondary_bg d-flex justify-content-center align-items-center'>
          <span className="weight-500">{title}</span>
        </div>
        <div className='popular-list-box'>
          {structure}
        </div>
      </div>
    </div>
  )
}
