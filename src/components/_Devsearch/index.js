import React from 'react'

import './devsearch.css'

export default function Devsearch () {
  return (
    <div id='searching-user' className='default-box'>
      <div>
        <input type='text' className='form-control gray_bg' placeholder='Nome ou apelido' />
        <input type='text' className='form-control gray_bg' placeholder='Cidade' />
        <select className='form-control gray_bg'>
          <option value=''>Tecnologias</option>
          <option value='angular'>Angular</option>
          <option value='c'>C</option>
          <option value='css'>CSS</option>
          <option value='c++'>C++</option>
          <option value='c#'>C#</option>
          <option value='css'>HTML</option>
          <option value='ionic'>Ionic</option>
          <option value='java'>Java</option>
          <option value='java script'>Java Script</option>
          <option value='php'>PHP</option>
          <option value='python'>Python</option>
          <option value='react js'>React JS</option>
          <option value='react native'>React Native</option>
        </select>
      </div>

      <div id='search-techs'>

        <div className='blue-circle standard_primary_bg'>
          <span>JS</span>
        </div>

        <div className='blue-circle standard_primary_bg'>
          <span>PHP</span>
        </div>

        <div className='blue-circle standard_primary_bg'>
          <span>Python</span>
        </div>

        <div className='blue-circle standard_primary_bg'>
          <span>CSharp</span>
        </div>

      </div>

    </div>
  )
}
