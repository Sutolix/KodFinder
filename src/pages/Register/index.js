import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../services/firebase'
import ReCAPTCHA from 'react-google-recaptcha'
import {reCaptcha, verifySuccess} from '../../components/ReCaptcha'

import './register.css'
import Spinner from 'react-spinner-material'
import { MdClose } from 'react-icons/md'
import Header from '../../components/Header'


export default function Register (props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [birth, setBirth] = useState('')
  const [gender, setGender] = useState('')
  const [terms, setTerms] = useState(false)
  const [type] = useState('user')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [retoken, setReToken] = useState('')

  // mensagens de erro
  const [nameError, setNameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [genderError, setGenderError] = useState(null)
  const [birthError, setBirthError] = useState(null)
  const [termsError, setTermsError] = useState(null)

  function verifyToken (token){
    verifySuccess(token)
    setReToken(token)
    setDisabled(false)
  }

  async function register (e) {
    e.preventDefault()

    // VERIFICATION
    let anError = false
    let errorInName = null
    let errorInPassword = null
    let errorInGender = null
    let errorInBirth = null
    let errorInTerms = null

    // Name error
    if ((name.trim().length <= 3) || (name.trim().length >= 30)) {
      errorInName = 'Por favor, insira um nome de tamanho válido.'
      anError = true
    }

    // Password Error
    if (password !== verifyPassword) {
      errorInPassword = 'As senha não são idênticas, por favor tentar novamente.'
      anError = true
    }

    if (password.length === 0) {
      errorInPassword = errorInPassword === null ? 'Senha inválida' : errorInPassword + ' Senha inválida.'
      anError = true
    }

    // Gender Error
    if (gender !== 'Masculino' && gender !== 'Feminino') {
      console.log(gender)
      errorInGender = 'Selecione seu sexo.'
      anError = true
    }

    // Terms Error
    if (!terms) {
      errorInTerms = 'Você precisa aceitar os termos de uso e privacidade.'
      anError = true
    }

    // Birth Error
    if (!birth) {
      errorInBirth = 'Por favor defina sua data de nascimento.'
      anError = true
    }

    // Token Error
    if (!retoken) {
      errorInName = 'Por favor, complete o reCaptcha.'
      anError = true
    }

    // If have an error
    if (anError) {
      setNameError(errorInName)
      setPasswordError(errorInPassword)
      setGenderError(errorInGender)
      setBirthError(errorInBirth)
      setTermsError(errorInTerms)
      return null
    }

    setLoading(true)

    await firebase.register(email, password)
      .then(data => {
        const users = firebase.database.ref('users')
        const uid = data.user.uid
        const key = users.push().key

        // Create user in database
        users.child(uid).set({
          key: key,
          name: name,
          email: email,
          birth: birth,
          gender: gender,
          type: type,
          emailOK: false
        })

        firebase.incrementCountUser()

        var user = firebase.getCurrentUser()

        user.updateProfile({
          displayName: name
          /* photoURL: "https://example.com/jane-q-user/profile.jpg" */
        }).then(function () {
          firebase.sendVerification()
            .catch(error => alert('Send error: ' + error.code))
            .finally(() => {
              props.history.push('/')
            })
        }).catch(function (error) {
          alert('Error: ' + error)
        })
      })
      .catch(error => alert('Error: ' + error))

    setLoading(false)
  }

  return (
    <section className='kodfinder-register footer-botton gray_bg'>
      <Header />
      <div className='container'>

        <div id='register-page'>

          <div className='welcone center'>
            <span>JUNTE-SE A NÓS</span>
            <p>Crie uma conta</p>
          </div>

          <div className='box-register'>
            <form className='text-center' onSubmit={register}>

              {nameError && (
                <div className='formErrors'>
                  <div className='d-flex align-items-center justify-content-between'>
                    {nameError}
                    <MdClose className='close-error' onClick={(e) => { setNameError(null) }} />
                  </div>
                </div>
              )}
              <div className='form-group'>
                <input
                  onChange={e => setName(e.target.value)}
                  type='text'
                  className='form-control inputPd'
                  placeholder='Nome e sobrenome'
                  autoComplete='off'
                  maxLength='30'
                  required
                />
              </div>

              <div className='form-group'>
                <input
                  onChange={e => setEmail(e.target.value)}
                  type='email'
                  className='form-control inputPd'
                  placeholder='Email'
                  required
                />
              </div>

              {passwordError && (
                <div className='formErrors'>
                  <div className='d-flex align-items-center justify-content-between'>
                    {passwordError}
                    <MdClose className='close-error' onClick={(e) => { setPasswordError(null) }} />
                  </div>
                </div>
              )}
              <div className='form-row'>
                <div className='form-group col-md-6'>
                  <input
                    onChange={e => setPassword(e.target.value)}
                    type='password'
                    className='form-control inputPd'
                    placeholder='Digite uma senha'
                    autoComplete='off'
                    required
                  />
                </div>
                <div className='form-group col-md-6'>
                  <input
                    onChange={e => setVerifyPassword(e.target.value)}
                    type='password'
                    className='form-control inputPd'
                    placeholder='Digite sua senha novamente'
                    autoComplete='off'
                    required
                  />
                </div>
              </div>

              <div className='form-row'>
                <div className='form-group col-md-6'>
                  <input
                    onChange={e => setBirth(e.target.value)}
                    type='date'
                    className='form-control inputPd'
                    required
                  />
                  {birthError && (
                    <div className='formErrors'>
                      <div className='d-flex align-items-center justify-content-between'>
                        {birthError}
                        <MdClose className='close-error' onClick={(e) => { setBirthError(null) }} />
                      </div>
                    </div>
                  )}
                </div>
                <div className='form-group col-md-6'>
                  <select
                    onChange={e => setGender(e.target.value)}
                    className='form-control inputPd'
                    required
                  >
                    <option value=''>Selecione o sexo</option>
                    <option value='Masculino'>Masculino</option>
                    <option value='Feminino'>Feminino</option>
                  </select>
                  {genderError && (
                    <div className='formErrors'>
                      <div className='d-flex align-items-center justify-content-between'>
                        {genderError}
                        <MdClose className='close-error' onClick={(e) => { setGenderError(null) }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {termsError && (
                <div className='formErrors'>
                  <div className='d-flex align-items-center justify-content-between'>
                    {termsError}
                    <MdClose className='close-error' onClick={(e) => { setTermsError(null) }} />
                  </div>
                </div>
              )}
              <div className='form-check'>
                <input
                  onChange={e => setTerms(e.target.checked)}
                  className='form-check-input'
                  type='checkbox'
                  id='gridCheck'
                  required
                />
                <label className='form-check-label'>
                  Li e aceito os <Link to='/terms' className='registerLink secondary_clr'>termos de uso e privacidade</Link>
                </label>
              </div>
              <div className='recaptcha d-flex justify-content-center'>
                <ReCAPTCHA
                  sitekey={reCaptcha.sitekey}
                  onChange={verifyToken}
                />
              </div>
              <div className='CadBotao'>
                <button type='submit' className='mt-3 btn standard_secondary_bg center' disabled={disabled}>
                  {loading ? <Spinner radius={20} color='#fff' stroke={3} visible /> : 'CADASTRAR'}
                </button>
              </div>
            </form>
          </div>

          <div className='copyright text-center'>
            <p>Copyright© 2020 Todos os direitos reservados. Desenvolvido por Hookod©</p>
          </div>
        </div>
      </div>
    </section>
  )
}
