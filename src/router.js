import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import EditPerfil from './pages/EditPerfil'
import ViewPerfil from './pages/ViewPerfil'
import Terms from './pages/Terms'
import About from './pages/About'
import Admin from './pages/Admin'
import Erro from './pages/Erro'
/* import ErroPerfil from "./pages/ErroPerfil"; */

export default function Routes () {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/edit-perfil' component={EditPerfil} />
        {/* <Route exact path="/edit-perfil" component={ ErroPerfil }/> */}
        <Route exact path='/user/:uid' component={ViewPerfil} />
        <Route exact path='/terms' component={Terms} />
        <Route exact path='/about' component={About} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/*' component={Erro} />
      </Switch>
    </BrowserRouter>
  )
}
