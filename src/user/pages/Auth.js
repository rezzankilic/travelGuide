import React, { useState } from 'react'
import Card from '../../shared/Card'
import Input from '../../shared/components/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/form-hook'


import "./Auth.css"
import Button from '../../shared/components/Button'

export default function Auth() {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm(
        {
          email: {
            value: '',
            isValid: false
          },
          password: {
            value: '',
            isValid: false
          }
        },
        false
      );

      function authSubmitHandler(e){
        e.preventDefault()

        console.log(formState.inputs)
      };

      function switchModeHandler(){
        if(!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData({
                ...formState.inputs,
                name:{
                    value: '',
                    isValid: false,
                }
            }, false)

        }
        setIsLoginMode(prevMode => !prevMode)
      };


  return (
    <Card className="authentication">
        <h2> {isLoginMode ? 'Login' : 'Sign Up' }</h2>
        <form onSubmit={authSubmitHandler}> 
        {!isLoginMode && 
            <Input 
            element="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
            />
        }
            <Input 
                element="input" 
                id="email" 
                type="email" 
                label="E-mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
            />
             <Input 
                element="input" 
                id="password" 
                type="password" 
                label="Password"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid password at least 5 characters.."
                onInput={inputHandler}
            />
            <Button type="submit" disable={!formState.isValid}> {isLoginMode ? 'LOGIN' : 'SIGNUP' }  </Button>
        </form>
        <p> If you have not signed up yet.</p>
        <Button inverse onClick={switchModeHandler}> {isLoginMode ? 'SIGNUP': 'LOGIN'}</Button>
    </Card>
    
  )
}
