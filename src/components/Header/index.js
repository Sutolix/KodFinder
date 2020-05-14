import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../services/firebase'
import BurguerMenu from '../Menu'
import './header.css'

export default function Header () {
  useEffect(() => {
    // Verifica se há um usuário logado
    firebase.liveUser((user) => {
      // Pega as informações desse usuário e salva no localstorage para agilizar
      // o acesso a essas informações em outros lugares
      firebase.getUserInformations(snapshot => {
        localStorage.setItem('user', snapshot.val().name)
        localStorage.setItem('type', snapshot.val().type)
        localStorage.setItem('uid', user.uid)
      })
    }
    )
  })

  return (
    <div className='header standard_primary_bg'>
      <div>
        <div className='row align-items-center' id='head-content'>
          <div className='col-4' id='head-left-text'>
            <div className='leftHeader'>
              <p>O que é <Link to='/about'>KodFinder</Link>?</p>
            </div>
          </div>
          <div className='col-lg-4 col-6'>
            <div className='centerHeader'>
              <Link to='/'>KodFinder</Link>
              <p className='secondary_clr'>v. Peanut</p>
            </div>
          </div>
          <div className='col-lg-4 col-6'>
            <div className='rightHeader'>
              {!localStorage.user ? (
                <>
                  <Link className='standard_secondary_bg NoUserButton' to='/register'>CADASTRAR</Link>
                  <Link className='standard_primary_bg NoUserButton' to='/login'>ACESSAR</Link>
                </>
              ) : (<></>)}
            </div>
          </div>
        </div>
      </div>
      {localStorage.user ? (
        <BurguerMenu />
      ) : (<></>)}
    </div>
  )
}
