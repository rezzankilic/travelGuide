import React from 'react'

import './PlaceItem.css'
import Card from '../../shared/Card';


export default function PlaceItem() {
    
  return ( 
    <li className='place-item'>
        <Card>
            <div className='place-item__image'>
                <img src={props.image} alt={props.title}/>
            </div>
            <div className='place-item__info'>
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <p>{props.desciption}</p>
            </div>
            <div className='place-item__actions'>
                <button>VIEV ON MAP</button>
                <button>EDIT</button>
                <button>DELETE</button>
            </div>
        </Card>
    </li>
  );
}
