import React, { useState, useContext } from 'react';
import Card from '../../shared/Card';
import Input from '../../shared/components/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import ErrorModal from '../../shared/ErrorModal';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ImageUpload from '../../shared/components/ImageUpload';



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

    console.log(formState.inputs);

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
        auth.login( responseData.userId, responseData.token );
        navigate('/');
      } catch (err) {
        console.log(err.message)
      }

      } else {
        try {
          const formData = new FormData();
          formData.append('email', formState.inputs.email.value);
          formData.append('name', formState.inputs.name.value);
          formData.append('password', formState.inputs.password.value);
          formData.append('image', formState.inputs.image.value);
          const responseData = await sendRequest(
            'http://localhost:4999/api/users/signup',
            'POST',
            formData
          );

        auth.login( responseData.userId, responseData.token );  
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
                    image: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData({
                ...formState.inputs,
                name:{
                    value: '',
                    isValid: false
                },
                image:{
                    value: null,
                    isValid: false
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
          
          {!isLoading && !isLoginMode && <ImageUpload center id="image" onInput={inputHandler} errorText="Please upload an image."/>}
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
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  errorText="Please enter a valid password at least 6 characters.."
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
