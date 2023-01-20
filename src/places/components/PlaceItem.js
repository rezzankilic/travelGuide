import React, {useState} from 'react'

import './PlaceItem.css'
import Card from '../../shared/Card';
import Button from '../../shared/components/Button';
import Modal from '../../shared/Modal';


export default function PlaceItem(props) {
    const [showMap, setShowMap] = useState(false)

    function openMap(){
        setShowMap(true)
    }

    function closeMap(){
        setShowMap(false)
    }
    
  return ( 
    <>
    <Modal 
        show={showMap} 
        onClick={closeMap} 
        header={props.address} 
        contenClass="place-item__modal-content" 
        footerClass="place-item__modal-items"
        footer={<Button inverse onClick={closeMap}>CLOSE</Button>}
    >

        <div className='map-container'>
            <h2> The Map </h2>
        </div>

    </Modal>


    <li className='place-item'>
        <Card className="place-item__content">
            <div className='place-item__image'>
                <img src={props.image} alt={props.title}/>
            </div>
            <div className='place-item__info'>
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <p>{props.desciption}</p>
            </div>
            <div className='place-item__actions'>
                <Button inverse onClick={openMap}>VIEW ON MAP</Button>

                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger >DELETE</Button>
            </div>
        </Card>
    </li>
    </>
  );
}
