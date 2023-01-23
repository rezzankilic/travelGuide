import React, {useState} from 'react'

import './PlaceItem.css'
import Card from '../../shared/Card';
import Button from '../../shared/components/Button';
import Modal from '../../shared/Modal';
import Map from '../../shared/Map';


export default function PlaceItem(props) {
    const [showMap, setShowMap] = useState(false)
    const [showConfirmModal, setshowConfirmModal] = useState(false)

    function openMap(){
        setShowMap(true)
    }

    function closeMap(){
        setShowMap(false)
    }

    function showDeleteWarningHandler(){
        setshowConfirmModal(true)
    }

    function cancelDeleteHandler(){
        setshowConfirmModal(false)
    }

    function confirmDeleteHandler(){
        setshowConfirmModal(false)
        console.log("Deleting")
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
            <Map />
        </div>

    </Modal>

    <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
            <div> 
                <Button inverse onClick={confirmDeleteHandler}> DELETE </Button>
                <Button danger onClick={cancelDeleteHandler}> CANCEL  </Button>
            </div>
            }
    >
        <p>Do you want to proceed? </p>
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
                <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
            </div>
        </Card>
    </li>
    </>
  );
}
