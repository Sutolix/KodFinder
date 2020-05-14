import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../services/firebase'
import Spinner from 'react-spinner-material'
import {AiFillHome} from 'react-icons/ai'
import './admin.css'

export default function Admin (props) {

	const [admin, setAdmin] = useState(false);

	  useEffect(() => {
    firebase.liveUser(user => {
      // if (user.type !== "admin") return props.history.push('/')
      firebase.getUserInformations(snapshot => {
        var type = snapshot.val().type
      	if (type === "admin" && localStorage.type === "admin"){
      		setAdmin(true)
      	} else return props.history.push('/')
      })
    })
  }, [props.history])

  return (
    <div className='gray_bg home footer-botton center'>
    	{(admin === true) ? (
    		<div className="painel default-box white_bg">
    			<div className="painel-title d-flex justify-content-between align-items-center">
    				<span className="weight-700">Painel Admin KodFinder</span>
            <Link to="/"><AiFillHome size={25} color={"#232f3e"}/></Link>
    			</div>
    		</div>
    	)
    	: (<Spinner radius={40} color='#232f3e' stroke={5} visible />)}
    </div>
  )
}
