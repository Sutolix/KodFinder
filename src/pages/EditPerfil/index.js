import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import firebase from '../../services/firebase'
import './edit.css'

/* import bioimage from '../../assets/img/black_coffee.webp'; */

export default function EditPerfil (props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [birth, setBirth] = useState('')
  const [gender, setGender] = useState('')
  const [city, setCity] = useState('')
  const [history, setHistory] = useState('')
  const [github, setGithub] = useState('')
  const [techs, setTechs] = useState([])
  const [technologies, setTechnologies] = useState([
    { value: 'Angular', id: 'angular', label: 'Angular' },
    { value: 'C', id: 'c', label: 'C' },
    { value: 'CSS', id: 'css', label: 'CSS' },
    { value: 'C++', id: 'c_plus', label: 'C++' },
    { value: 'C#', id: 'c_sharp', label: 'C#' },
    { value: 'HTML', id: 'html', label: 'HTML' },
    { value: 'Ionic', id: 'ionic', label: 'Ionic' },
    { value: 'Java', id: 'java', label: 'Java' },
    { value: 'Javascript', id: 'javascript', label: 'Javascript' },
    { value: 'PHP', id: 'php', label: 'PHP' },
    { value: 'Python', id: 'python', label: 'Python' },
    { value: 'React JS', id: 'reactjs', label: 'React JS' },
    { value: 'React Native', id: 'reactnative', label: 'React Native' },
  ])

  useEffect(() => {
    firebase.liveUser(user => {
      // Verificar se o usuário está logado
      if (!user) return props.history.push('/')

      firebase.getUserInformations(snapshot => {
        setName(snapshot.val().name)
        setBirth(snapshot.val().birth)
        setGender(snapshot.val().gender)

        // Caso já existam, irão preencher os campos automaticamente
        if (snapshot.val().nickname) { setNickname(snapshot.val().nickname) }

        if (snapshot.val().city) { setCity(snapshot.val().city) }

        if (snapshot.val().github) { setGithub(snapshot.val().github) }

        if (snapshot.val().history) { setHistory(snapshot.val().history) }

        if (snapshot.val().techs) { setTechs(snapshot.val().techs) }

        setIsLoaded(true)
      })
    })
  }, [props.history])

  // Salvar dados do usuário
  async function handleUpdateUser (e) {
    e.preventDefault()

    // Pega alguns dados do usuário atual, o que será usado é o seu uid
    const currentUser = firebase.getCurrentUser()

    // Recuperar todos os dados, para depois alterá los
    let userData = {}
    await firebase.getUserInformations(snapshot => userData = snapshot.val())

    userData.name = name
    userData.nickname = nickname
    userData.birth = birth
    userData.gender = gender
    userData.city = city
    userData.history = history
    userData.techs = techs

    console.log(userData.techs)

    // Salvar no banco de dados
    await firebase.database.ref('users').child(currentUser.uid).set(userData)

    alert('Tá salvo hehe')
  }

  // Salvar Github
  async function handleSaveGit (e) {
    e.preventDefault()

    // Pega alguns dados do usuário atual, o que será usado é o seu uid
    const currentUser = firebase.getCurrentUser()

    // Recuperar todos os dados, para depois alterá los
    let userData = {}
    await firebase.getUserInformations(snapshot => userData = snapshot.val())

    if (github) {
      userData.github = github

      // Salvar no banco de dados
      await firebase.database.ref('users').child(currentUser.uid).set(userData)

      alert('Github salvo')
    } else {
      alert('Digite algo válido!')
    }
  }

  // Tecnologias
  function handleTechs(e) {
    const isChecked = e.target.checked

    let cleanTechs = techs

    if(isChecked && !cleanTechs.find(tech => tech === e.target.value)) {
      cleanTechs.push(e.target.value)
    } else {
      cleanTechs = cleanTechs.filter(tech => tech !== e.target.value)
    }

    setTechs(cleanTechs)
  }

  return (
    <div className='edit-perfil footer-botton gray_bg'>
      <Header />
      <div className='container' id='edit-perfil-page'>
        <div className='row'>
          <div id='edit-left-info' className='col-md-8 order-md-1 order-12'>
            <div id='personal-info' className='default-box'>

              <p className='secondary_clr edit-tittle'>INFORMAÇÕES PESSOAIS</p>
              <div className='inputs'>
                <form onSubmit={e => handleUpdateUser(e)}>
                  <div className='form-row'>
                    <div className='col-md-6'>
                      <div className="form-group">
                        <label>Nome</label>
                        <input type='text' className='form-control' placeholder='Seu nome' value={name} onChange={e => setName(e.target.value)} />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className="form-group">
                        <label>Apelido</label>
                        <input type='text' className='form-control' placeholder='Como você é chamado?' value={nickname} onChange={e => setNickname(e.target.value)} />  
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='col-md-6 col-lg-4'>
                      <div className="form-group">
                        <label>Data de nascimento</label>
                        <input type='date' className='form-control' value={birth} onChange={e => setBirth(e.target.value)} />
                      </div>
                    </div>
                    <div className='col-md-6 col-lg-4'>
                      <div className="form-group">
                        <label>Sexo</label>
                        <select value={gender} onChange={e => setGender(e.target.value)} className='form-control' required>
                          <option value=''>Selecione o sexo</option>
                          <option value='Masculino'>Masculino</option>
                          <option value='Feminino'>Feminino</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-md-6 col-lg-4'>
                      <div className="form-group">
                        <label>Cidade</label>
                        <input type='text' className='form-control' placeholder='Onde mora?' value={city} onChange={e => setCity(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Conte um pouco da sua história</label>
                    <textarea className='form-control' rows='5' cols='33' value={ history } onChange={ e => setHistory(e.target.value) } />
                  </div>
                  <div className="form-group">
                    <label>Tecnologia que você utiliza e/ou tem certo domínio</label>
                    <div className="technologies">
                      {
                        technologies.map(technology => (
                          <div className='d-inline-block' key={ technology.id }>
                            <input className='form-check-input' 
                              onChange={ handleTechs }
                              checked={ techs.find(tech => tech === technology.value) }
                              value={ technology.value }
                              id={ technology.id }
                              type='checkbox' 
                            />
                            <label className='form-check-label' htmlFor={ technology.id }>{ technology.label }</label>
                          </div>
                        ))
                      }
                    </div>
                  </div>        
                  <button type='submit' className='btn standard_primary_bg white_clr' disabled={!isLoaded}>{!isLoaded ? ('Carregando dados') : ('Salvar Alterações')}</button>
                </form>
              </div>
            </div>
            
            {/* <div className='about-you default-box'>
              <div className='about-top'>
                <p className='secondary_clr edit-tittle'>MAIS SOBRE VOCÊ</p>
              </div>

              <div className='biography text-center gray_bg'>
                <div id='no-history'>
                  <p>
                    Você ainda não contou sua história para a gente =(
                  </p>
                  <div>
                    <textarea className='form-control' rows='5' cols='33' value={ history } onChange={ e => setHistory(e.target.value) } />
                    <button className='add-github-button btn btn-primary standard_primary_bg white_clr'>Isso é tudo!</button>
                  </div>
                </div>
              </div>
            </div> */}

          </div>

          <div id='edit-right-info' className='col-md-4 order-md-12 order-1'>
            {/* <div className='add-tech col-sm d-flex flex-column justify-content-center default-box'>
              <h5 className='secondary_clr edit-tittle text-center'>ADICIONAR TECNOLOGIAS</h5>
              <form className='row add-techs'>
                {
                  technologies.map(tech => (
                    <div className='form-check col-6' key={ tech.id }>
                      <input className='form-check-input' onChange={ handleTechs } type='checkbox' value={ tech.value } id={ tech.id } />
                      <label className='form-check-label' htmlFor={ tech.id }>{ tech.label }</label>
                    </div>
                  ))
                }
                <div className='col-12 d-flex justify-content-center'>
                  <button className='btn standard_primary_bg white_clr'>Salvar</button>
                </div>
              </form>
            </div> */}

            <div className='add-github default-box'>
              <p className='secondary_clr edit-tittle'>GITHUB</p>
              <form className='d-flex justify-content-center' onSubmit={e => handleSaveGit(e)}>
                <input type='text' className='inputPd gray_bg' placeholder='@username' value={github} onChange={e => setGithub(e.target.value)} />
                <button className='add-github-button btn standard_primary_bg white_clr' disabled={!isLoaded}>Salvar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
