import React, { useState, useContext } from 'react';
import Card from '../../shared/Card';
import Input from '../../shared/components/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import ErrorModal from '../../shared/ErrorModal';
import LoadingSpinner from '../../shared/LoadingSpinner';



import { AuthContext } from '../../shared/hooks/auth-context'
import "./Auth.css"
import Button from '../../shared/components/Button'
import { useNavigate } from 'react-router-dom';
import {useHttpClient} from '../../shared/hooks/http-hook';

export default function Auth() {
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();


  const navigate = useNavigate();

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



  const authSubmitHandler = async (e) => {
    e.preventDefault();
    if(isLoginMode){

      try{
        const responseData = await sendRequest(
          'http://localhost:4999/api/users/login', 
          'POST', 
          JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login( responseData.user.id );
        navigate('/');
      } catch (err) {
        console.log(err.message)
      }

      } else {
        try{
          const responseData = await sendRequest('http://localhost:4999/api/users/signup',
           'POST',
            JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
            }),
            {
            'Content-Type': 'application/json'
            }
        );
        auth.login( responseData.user.id );  
        navigate('/')

        } catch(err){ 
          console.log(err.message)
        }
    }
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


      const errorHandler = () => {
        clearError();
      }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler}/>
      <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}


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
    </>
    
  )
}
