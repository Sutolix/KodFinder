import React from 'react'
import { MdCake } from 'react-icons/md'
import { FaMapMarkedAlt, FaGithub } from 'react-icons/fa'
import './edit.css'

import useravatar from '../../assets/img/avatar.webp'

export default function EditPerfil (props) {
  return (
    <div className='resume-info-box'>
      <div className='banner-top-info-box'>
        <img src={useravatar} alt='user-avatar' id='edit-perfil-avatar' />
      </div>
      {/* <div id="nick">
                    <span>@nick</span>
                </div>
            */}
      <div className='social-info default-box row'>
        <div id='cake-day' className='col informations'>
          <p>Cake day</p>
          <>
            <MdCake size={25} color='black' />
            <span>{birth || ('Carregando')}
            </span>
          </>
        </div>

        <div id='city-info' className='col informations'>
          <p>Cidade</p>
          <>
            <FaMapMarkedAlt size={25} color='black' />
            <span>{city || 'Não adicionado'}</span>
          </>
        </div>

        <div id='github-info' className='col informations'>
          <p>Github</p>
          <>
            <FaGithub size={30} color='black' />
            <span>{github || 'Não adicionado'}</span>
          </>
        </div>

      </div>
    </div>

  )
}
