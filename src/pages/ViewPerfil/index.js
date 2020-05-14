import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import firebase from '../../services/firebase'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './view.css'
import avatar from '../../assets/img/avatar.webp'
import image from '../../assets/img/back-coffee.webp'

export default function ViewPerfil () {
  const [usuario, setUsuario] = useState()
  const [nick, setNick] = useState()
  const [github, setGithub] = useState()
  const [history, setHistory] = useState()
  const [type, setType] = useState('user')
  const [techs, setTechs] = useState([])
  const { uid } = useParams()
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    // Pega o uid da url e dá um snapshot usando ele para pegar os dados do
    // usuário em questão
    var ref = firebase.database.ref(`users/${uid}`)
    ref.once('value')
      .then(function (snapshot) {
        const name = (snapshot.child('name').val())
        const nick = (snapshot.child('nickname').val())
        const github = (snapshot.child('github').val())
        const type = (snapshot.child('type').val())
        const history = (snapshot.child('history').val())
        const techs = (snapshot.child('techs').val())
        setUsuario(name)
        setNick(nick)
        setGithub(github)
        setType(type)
        setHistory(history)
        setTechs(techs)

        setLoading(false)
      })
  }, [uid])

  return (
    <div className='view-perfil gray_bg footer-botton'>
      {
        loading ?
        ('Carregando')
        :
        (
        <>
          <Header />
          <div className='view-page container'>
            <div className='box-view'>
              <div className='view-top row justify-content-between'>
                <div className='row'>
                  <img src={avatar} alt='avatar' />
                  <span>{usuario}</span>
                </div>
                {type === 'admin' ? (<div id='adminview' title='Este é um administrador!' />) : (<></>)}
              </div>
              <div className='view-info row'>

                <div className='left-info col-md-8'>
                  {nick ? (
                    <>
                      <h3>Para os intimos</h3>
                      <span className='primary_clr'>{nick}</span>
                    </>
                  ) : (<></>)}

                  <p>
                    { 
                      history 
                      ? 
                      history 
                      :
                      ('Sua história ainda não foi compartilhada com a comunidade :(') 
                    }
                  </p>
                </div>

                <div className='right-info col-md-4'>
                  <div className='yours-techs'>
                    <span className='primary_clr title'>O que ele manja?</span>
                    <div className='techs'>
                      {
                        techs === null ?
                        (
                        <p className="text-muted">
                          Hmmm. pelo visto não disse nada à respeito disso
                        </p>
                        )
                        :
                        techs.map(tech => (
                        <div className='standard_primary_bg tech-box' key={tech}>
                            <p>{ tech }</p>
                        </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className='git-view'>
                    <h4>Github</h4>
                    {github ? (
                      <span className='primary_clr'>@{github}</span>) : (
                      <span className='gray_clr'>Não informado</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='image-back'>
            <img src={image} alt='coffee' className='back-img' />
          </div>
          <Footer />
        </>)
      }
    </div>
  )
}
