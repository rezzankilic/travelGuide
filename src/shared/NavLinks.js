import React from 'react'

import './NavLink.css'
import { NavLink } from 'react-router-dom'

export default function NavLinks(props) {
  return (
    <ul className='nav-links'>
        <li>
            <NavLink to='/'>ALL USERS</NavLink>
        </li>
        <li>
            <NavLink to='/1/places'>My PLACES</NavLink>
        </li>
        <li>
            <NavLink to='/places/new'>ADD PLACE</NavLink>
        </li>
        <li>
            <NavLink to='/auth'>AUTHENTICATION</NavLink>
        </li>

    </ul>
  )
}
