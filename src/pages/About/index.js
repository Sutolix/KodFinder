import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import firebase from '../../services/firebase'
import Spinner from 'react-spinner-material'
import './about.css'

/* Animations */
import FunkyChicken from '../../components/Animations/FunkyChicken.jsx'
import DevAvatar1 from '../../components/Animations/DevAvatar1.jsx'
import DevAvatar2 from '../../components/Animations/DevAvatar2.jsx'

export default function About () {
  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
    firebase.database.ref('count_users').once('value', snapshot => {
      const count_users = snapshot.val()
      setUserCount(count_users)
    })
  }, [])

  return (
    <div className='footer-botton gray_bg'>
      <Header />
      <div id='about_page' className='d-flex flex-column'>
        <div className='description_box d-flex justify-content-around'>
          <div id='description'>
            <h1 className='primary_clr weight-bold'>Este serviço foi criado para unir programadores</h1>

            <p>
              Se você faz parte da nossa região (Ponte Nova - MG) e se interessa por programação
              já percebeu que não há uma cultura dev por aqui, não temos nem mesmo eventos ou coisa do tipo
              relacionado a nós, e é aí que esse site entra em cena. Queremos criar um sentimento
              de união entre todos, queremos popularizar nossa profissão e acima de tudo prover um lugar para
              nos reunirmos e ajudarmos uns aos outros. <br/><br/>
              Junte-se a nós nessa jornada <span role="img" aria-label="sheep">😎</span>
            </p>
          </div>
          <div id='chicken'>
            <FunkyChicken />
          </div>
        </div>

        <div id='details'>
          <div className='details_text d-flex justify-content-center align-items-center flex-column'>
            <div className='text-center'>
              <span className='weight-bold white_clr'>VERSÃO</span>
              <h1 className='secondary_clr weight-bold'>PEANUT</h1>
            </div>
            <div className='white_clr text-center paragraph'>
              <p>
                Digamos que essa seja uma versão alpha do nosso querido site. Tudo está em sua fase inicial
                e há muito para se fazer, bugs serão comuns por um tempo, por favor entenda. Mas ficaríamos
                felizes se entrassem vez ou outra para ver como estamos progredindo.
              </p>
              <p>
                Se navegando pelo site perceber que seria legal ter alguma função que facilitaria
                a vida de vocês usuários, sintam-se livres para fazerem sugestões para nós!
              </p>
            </div>
          </div>

          <div className='boxes white_clr row justify-content-center'>

            <div className='details_box col-md-4 ocult'>
              <div className='info default-box standard_primary_bg'>
                <div className='head_box d-flex flex-column align-items-center'>
                  <p className='title weight-bold'>CORREÇÕES MAIS RECENTES</p>
                  <span className='weight-bold'>22/04/2019</span>
                </div>

                <div>
                  <p>- Mudança de nome</p>
                  <p>- Somente usuários verificados na user list</p>
                  <p>- ReCaptcha implementado no cadastro</p>
                  <p>- Adição da página de termos de uso</p>
                </div>
              </div>
            </div>

            <div className='details_box col-md-4'>
              <div className='lovers_count info d-flex flex-column justify-content-center align-items-center'>
                <p className='weight-bold'>ATÉ AGORA SOMOS</p>
                <div className='count_users d-flex align-items-center'>
                  {(!userCount) ? (
                    <Spinner radius={40} color='#fff' stroke={5} visible />
                  ) : (
                    <span className='weight-900 secondary_clr'>{userCount}</span>
                  )}
                </div>
                <p className='weight-bold'>AMANTES DA PROGRAMAÇÃO</p>
              </div>
            </div>

            <div className='details_box col-md-4 ocult'>
              <div className='info default-box standard_primary_bg'>
                <div className='head_box d-flex flex-column align-items-center'>
                  <p className='title weight-bold'>MAS ESPERE UM SEGUNDO... O QUE É</p>
                  <span className='weight-bold'>PEANUT</span>
                </div>

                <p>Do italiano arachide. Do grego φυστίκι. Do português, minduim.</p>
                <p>É como carinhosamente chamamos a versão do sistema =)</p>
                <p>Cada versão trará além de melhorias um novo nome que acharmos legal.</p>
              </div>
            </div>

          </div>
        </div>

        <div id='about_us' className='d-flex align-items-center flex-column'>
          <div>
            <div className='about_box text-center'>
              <h2 className='primary_clr weight-bold'>Quem somos</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamcLorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercita
                tion ullamco laboris nisi ut aliquip ex ea commodo consequat.
                o laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className='creators_box d-md-flex justify-content-around'>

              <div className='cardcontainer'>
                <div>
                  <div className='creator default-box white_bg d-flex flex-column align-items-center'>
                    <DevAvatar1 />
                    <span className='weight-bold secondary_clr'>Igor Horta</span>
                    <p className='text-center'>
                        Desenvolvedor fullstack em aprendizagem. Formado em TI e cursando Eng. de Software.
                        Amante de javascript e suas frameworks.
                    </p>
                  </div>
                </div>
              </div>

              <div className='cardcontainer'>
                <div>
                  <div className='creator default-box white_bg d-flex flex-column align-items-center'>
                    <DevAvatar2 />
                    <span className='weight-bold secondary_clr'>Tiago Reis</span>
                    <p className='text-center'>
                      Desenvolvedor frontend com foco em React. Formado em TI e amante de todo
                      tipo de tecnologia. 
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
