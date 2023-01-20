import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group'

import './Modal.css'
import Backdrop from './Backdrop.js'

const ModalOverLay = (props) => {
    const content = (
        <div className={`modal ${props.class}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={
                props.onSubmit ? props.onSubmit : (e)=>{e.preventDefault()}}>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );

    return ReactDOM.createPortal(content , document.getElementById("modal-hook"));

}

export default function Modal(props) {

  return (
    <>
    {props.show && <Backdrop onClick={props.onCancel}/> }

    <CSSTransition 
        in={props.show} 
        mountOnEnter 
        unmountOnExit 
        timeout={200} 
        classNames="modal"
    > 
        <ModalOverLay {...props} />
    </CSSTransition >

    
    </>
   )
}
