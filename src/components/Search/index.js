import React from 'react'

import './search.css'

export default function BoxList () {


  return (
    <div className='search'>
			<div className="input-group">
  			<input type="text" className="form-control gray_clr" placeholder="pesquisar usuários por..." />
  		</div>
  		<div className="standard_primary_bg search-filter d-flex justify-content-around">

  			<div className="options d-flex justify-content-center align-items-center options bg-yellow">
        	<input className='form-check-input'
        		type='radio'
        		id="name"
        		name="searching"
        		value="name"
        		defaultChecked
        		/>
        	<label className='form-check-label weight-bold white_clr' htmlFor='name'>Nome</label>
        </div>

         <div className="options d-flex justify-content-center align-items-center options">
        	<input className='form-check-input'
        		type='radio'
        		id="tech"
        		name="searching"
        		value="tech" />
        	<label className='form-check-label weight-bold white_clr' htmlFor='tech'>Tecnologia</label>
        </div>

         <div className="options d-flex justify-content-center align-items-center options">
        	<input className='form-check-input'
        		type='radio'
        		id="city"
        		name="searching"
						value="city" />
        	<label className='form-check-label weight-bold white_clr' htmlFor='city'>Cidade</label>
        </div>
  		</div>
  	</div>
  )
}