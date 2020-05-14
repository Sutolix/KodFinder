import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../services/firebase'
import Pagination from '../Pagination'
import devavatar from '../../assets/img/avatar.webp'
import Spinner from 'react-spinner-material'
import './devlist.css'

export default function Devslist () {
  // user
  const [user, setUser] = useState([])
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [profilesPerPage] = useState(12)

  useEffect(() => {
    // Pega os usuarios no banco de dados
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
      // Inverte a ordem do array para os últimos cadastrados aparecerem primeiro
      users.reverse()
      // Define user como o array resultante do forEach
      setUser(users)
    })
  }, [])

  const indexOfLastProfile = currentPage * profilesPerPage
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage
  const currentProfiles = user.slice(indexOfFirstProfile, indexOfLastProfile)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <>
      <div id='devs' className='row'>
        {
          user.length === 0 ? (
            <Spinner radius={40} color='#232f3e' stroke={5} visible />

          ) : (currentProfiles.map((account) => (

            (account.emailOK === true) ? (
              <div className='col-md-6 col-xl-4' key={account.key}>

                <Link to={`/user/${account.key}`}>
                  <div className='dev d-flex align-items-center'>                                                <div>
                    <img src={devavatar} alt='dev-avatar' />
                                                                                                                 </div>

                    <div className='d-block dev-info'>
                    <p className='secondary_clr weight-bold'>{account.name}</p>
                    {account.nickname ? (
                        <p>Vulgo<b> {account.nickname}</b></p>
                    ) : (<></>)}
                    <p>Tecnologia Favorita: <b>JavaScript</b></p>
                  </div>
                  </div>
                </Link>
              </div>

            ) : (<div key={account.key} />)

          ))
          )
        }
      </div>
      {(profilesPerPage < user.length) ? (
        <Pagination
          profilesPerPage={profilesPerPage}
          totalProfiles={user.length}
          paginate={paginate}
        />
      ) : (<></>)}
    </>
  )
}
