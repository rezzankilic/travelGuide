import React, {useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import './UpdatePlace.css';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/utils/validators'; 
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorModal from '../../shared/ErrorModal';
import { AuthContext } from '../../shared/hooks/auth-context';





const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;  
  const navigate = useNavigate();
 

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );


  useEffect(()=>{
    const fetchPlace = async() => {
      try{
        const responseData = await sendRequest(`http://localhost:4999/api/places/${placeId}`);
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            }
          },
          true
        );


      } catch (err) {}
    }
    fetchPlace();
  }, [sendRequest, placeId, setFormData])



  const placeUpdateSubmitHandler = async event => {
    
    event.preventDefault();
    try{
      await sendRequest(`http://localhost:4999/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        { 
          'Context-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      
      )
      navigate('/');
    } catch (err) { }
    
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }


  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card><h2>Could not find place!</h2></Card>
        
      </div>
    );
  }

 

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && 
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>}
    </>
  );
};

export default UpdatePlace;