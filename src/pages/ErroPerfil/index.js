import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './erro-perfil.css'

export default function ErroPerfil () {
  return (
    <div className='erro-perfil footer-botton'>
      <Header />
      <span>Você precisa estar logado para editar seu perfil!</span>
      <Footer />
    </div>
  )
}
