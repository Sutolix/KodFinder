import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../services/firebase'
import Header from '../../components/Header'

import Spinner from 'react-spinner-material'
import './login.css'

export default function Login (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Aniload, setAniload] = useState('ACESSAR')

  // Faz o login
  async function login (e) {
    e.preventDefault()

    setAniload(<Spinner radius={20} color='#fff' stroke={3} visible />)

    await firebase.login(email, password)
      .then(data => {
        window.location.href = '/'
      })
      .catch(error => {
        // console.log(error)
        alert(error.message)
      })

    setAniload('ACESSAR')
  }

  return (
    <section className='kodfinder-login footer-botton gray_bg'>
      <Header />
      <div className='container'>

        <div id='login-page'>
          <div className='box-login text-center'>

            <h2>Entre com sua conta</h2>

            <form onSubmit={login} className='form-login center'>
              <input className='form-control' onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' required spellCheck='false' autoComplete='username' />
              <input className='form-control' onChange={e => setPassword(e.target.value)} type='password' placeholder='Senha' required spellCheck='false' autoComplete='current-password' />
              <button type='submit' className='btn standard_secondary_bg'>{Aniload}</button>
            </form>

            <p>Não tem uma conta? <Link to='register' className='registerLink secondary_clr'>Clique aqui</Link></p>
          </div>

          <div className='copyright'>
            <p>Copyright© 2020 Todos os direitos reservados. Desenvolvido por Hookod©</p>
          </div>
        </div>
      </div>
    </section>
  )
}
