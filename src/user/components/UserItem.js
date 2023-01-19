import React from 'react';

import './UserItem.css';
import { Link } from 'react-router-dom';
import Avatar from '../../shared/Avatar';
import Image from '../../images/pexels-kássia-melo-15071001.jpg';
import Card from '../../shared/Card';

export default function UserItem(props) {
  return (

    <li className='user-item'>
        <Card className='user-item__content'>
            <Link to={`/${props.id}/places`}>
                <div className='user-item__image'>
                    <Avatar image={Image} alt={props.name}/>
                </div>
                <div className='user-item__info'>
                    <h2> {props.name} </h2>
                    <h3> {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'} </h3>
                </div>
            </Link>
        </Card>
    </li>
 
  )
}
