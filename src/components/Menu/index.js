import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../services/firebase'
import { slide as Menu } from 'react-burger-menu'
import { MdInfo, MdSettings, MdSecurity } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import {RiGitRepositoryPrivateLine} from 'react-icons/ri'
import './menu.css'
import useravatar from '../../assets/img/avatar.webp'

export default function BurguerMenu () {
  return (
    <Menu right width={280}>
      <Link to={`/user/${localStorage.uid}`}><img src={useravatar} alt='user-avatar' className='my-avatar' /></Link>
      <Link to={`/user/${localStorage.uid}`}><span className='secondary_clr weight-500'>{localStorage.user}</span></Link>
      <div className='separationline' />
      <Link to='/' className='menu-item d-flex align-items-center white_clr weight-700'><span>Configurações</span><MdSettings size={20} /></Link>
      <Link to='/edit-perfil' className='menu-item d-flex align-items-center white_clr weight-700'><span>Editar Perfil</span><FaUser size={20} /></Link>
      <Link to='/terms' className='menu-item d-flex align-items-center white_clr weight-700'><span>Termos</span><RiGitRepositoryPrivateLine size={20} /></Link>
      <Link to='/about' className='menu-item d-flex align-items-center white_clr weight-700'><span>Sobre</span><MdInfo size={20} /></Link>
      <button type='button' onClick={firebase.logout} className='btn btn-sm btn-danger btn-logout'>Logout</button>
      <div className='separationline' />
      {(localStorage.type === "admin") ?
      (
        <Link to='/admin' className='menu-item d-flex align-items-center white_clr weight-700'><span>Painel Admin</span><MdSecurity size={20} /></Link>
      )
      :(<></>)}
    </Menu>
  )
}
