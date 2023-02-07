import React, {useContext} from 'react'

import './NavLink.css'
import { NavLink, useParams } from 'react-router-dom'
import { AuthContext } from './hooks/auth-context'

export default function NavLinks(props) {

    const auth = useContext(AuthContext)
  return (
    <ul className='nav-links'>
        <li>
            <NavLink to='/'>ALL USERS</NavLink>
        </li>
        {auth.isLoggedIn && (
            <li>
                <NavLink to={`/${auth.userId}/places`}>My PLACES</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to='/places/new'>ADD PLACE</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to='/logout'>Logout</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to='/auth'>AUTHENTICATION</NavLink>
            </li>
        )}

    </ul>
  )
}
