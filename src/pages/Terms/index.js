import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './terms.css'
import logo from '../../assets/img/logo.svg'

export default function Terms () {
  return (
    <div className='terms-page gray_bg footer-botton'>
      <Header />
      <div className="terms-info">
        <div className="terms-title white_bg d-flex align-items-center">
          <p className="primary_clr weight-bold">TERMOS DE USO <br/> E PRIVACIDADE</p>
        </div>
        <div className="terms gray_bg">
          <div className="details-terms">
            <h3 className="weight-bold">Título do termo</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="details-terms">
            <h3 className="weight-bold">Sua conta</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div className="logo-icon d-flex justify-content-center">
          <img src={logo} alt="logo"/>
        </div>
      </div>
      <Footer />
    </div>
  )
}
