import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/ErrorModal';
import LoadingSpinner from '../../shared/LoadingSpinner';

import './UserPlaces.css';
import PlaceList from '../components/PlaceList';


const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces ] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const userId = useParams().userId;
  console.log(userId);
  const navigate = useNavigate();
  

  useEffect(() => {
    
    const fetchPlaces = async () => {
      try{
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      } catch (err) {}
      }
    fetchPlaces();
    
    navigate(`/${userId}/places`)
  }, [sendRequest, userId, navigate]);


  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => 
      prevPlaces.filter(place=> place.id !== deletedPlaceId))
  }


  return (
  <>
  <ErrorModal  error={error} onClear={clearError}/>
  {isLoading && 
  <div className='center'>
    <LoadingSpinner />
  </div>
   }
  
  {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace = {placeDeletedHandler} />};
  </>
  )
};

export default UserPlaces;
