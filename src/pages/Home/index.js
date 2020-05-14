import React, { useState, useEffect, Fragment } from 'react'
import firebase from '../../services/firebase'
import { Link } from 'react-router-dom'
//customizations
import './home.css'
import Spinner from 'react-spinner-material'
import devavatar from '../../assets/img/avatar.webp'
// components
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Search from '../../components/Search'
import BoxList from '../../components/BoxList'
import Welcomebox from '../../components/Welcomebox'
import Posts from '../../components/Posts'

export default function Home(props) {

  const [user, setUser] = useState([])

  useEffect(() => {
    firebase.database.ref('users').orderByChild('key').limitToFirst(60).on('value', (snapshot) => {
      const users = []

      snapshot.forEach((childItem) => {
        users.push({
          key: childItem.key,
          name: childItem.val().name,
          nickname: childItem.val().nickname,
          emailOK: childItem.val().emailOK
        })
      })

      var verifiedUsers = users.filter(function(email){
        return email.emailOK === true;
      })

      verifiedUsers.reverse()
      setUser(verifiedUsers)
    })
  }, [])

  //Listas a serem exibidas
  const toplanguage = (
    <>
      <div className='row popular-count white_bg d-flex align-items-center weight-500'>
        <div className='tech-list col-10 col-10 d-flex align-items-center'>
          <div className='standard_primary_bg list-popular-icon d-flex justify-content-center align-items-center'>
            <span className='white_clr'>JS</span>
          </div>
          <p className='primary_clr item-name'>Java Script</p>
        </div>
        <div className='col-2'>
          <p className='count-popular-item'>31</p>
        </div>
      </div>
    </>
  );

  const newusers = (user.map((account) => (
    <Fragment key={account.key}>
      <div className='row popular-count white_bg d-flex align-items-center weight-500'>
        <div className='user-list col-10 col-10 d-flex align-items-center'>
          <div className='list-popular-icon d-flex justify-content-center align-items-center'>
            <span><img src={devavatar} alt='dev-avatar' /></span>
          </div>
          <div className="d-flex flex-column">
            <Link to={`/user/${account.key}`}>
              <p className='item-name-user primary_clr weight-700'>{account.name}</p>
            </Link>
            <p className="main-tech">Tecnologia Principal: <b>Java Script</b></p>
          </div>
        </div>
      </div>
    </Fragment>
    ) 
  ))

  return (
    <div className='gray_bg home footer-botton'>
      <Header />
      <div id='home-page'>
        {(user.length) === 0 ? (
         <Spinner radius={40} color='#232f3e' stroke={5} visible />
        ) : (
        <div id='home-base' className='d-flex'>

          <div id='left-home-page'>
            <Search />

            <BoxList structure={toplanguage} title={<><span className='weight-700'>Top 5</span> Linguagens mais Utilizadas</>} />

            <BoxList structure={newusers} title={"Novos usuários no site"} />
          </div>

          <div id='right-home-page'>
            <Welcomebox />

            <Posts />
          </div>

        </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
