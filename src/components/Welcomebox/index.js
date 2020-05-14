import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../services/firebase'
import './welcomebox.css'

import { IoMdCloseCircle } from 'react-icons/io'

export default function Welcomebox () {
  const [user, setUser] = useState({
    emailVerified: '',
    isLoaded: false
  })

  useEffect(() => {
    // Verifica se o usuário esta logado e se seu email foi verificado, quando termina
    // define isLoaded como true para que possa ser exibido em tela
    firebase.liveUser((user) => {
      if (user) {
        firebase.getUserInformations(snapshot => {
          setUser({
            emailVerified: firebase.isVerified(),
            isLoaded: true
          })
        })

        async function verify () {
          if (user.emailVerified === true) {
            let verifyEmail = {}
            await firebase.getUserInformations(snapshot => verifyEmail = snapshot.val())

            if (!verifyEmail.emailOK) {
              verifyEmail.emailOK = true
              // Atualiza o valor no banco de dados
              await firebase.database.ref('users').child(user.uid).set(verifyEmail)
            }
          }
        }
        verify()
      }
    })
  }, [])

  // Fecha o welcome-box
  function handleClick (e) {
    e.preventDefault()
    document.getElementById('welcome-box').remove()
  }

  return (
    <>
      {user.isLoaded && !user.emailVerified ? (

        <div id='welcome-box' className='row white_bg default-box'>

          <div className='col-md-4'>
            <h3 className='primary_clr weight-500'>Bem vindo(a) ao <b>KodFinder</b></h3>
            <h4 className='secondary_clr weight-500'>versão PEANUT</h4>

            <Link to='/about'>
              <button className='btn btn-primary standard_secondary_bg'>Mais detalhes</button>
            </Link>
          </div>
          <div className='col-md-8'>
            <p>
                Enviamos um link de confirmação ao seu email. Por favor, verifique sua
                caixa de entrada e faça a confirmação do mesmo. Caso não encontre,
                tente olhar a caixa de span ou aguarde um pouco. Se ainda assim não receber,
                entre em contato com nossa equipe que resolveremos para você <span role='img' aria-label='sheep'>😉</span>.
            </p>
          </div>

          <div id='close-button'>
            <IoMdCloseCircle size='30px' color='#D62C2C' onClick={handleClick} />
          </div>
        </div>) : (<></>)}
    </>
  )
}
