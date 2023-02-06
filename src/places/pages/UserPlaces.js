import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'

import './UserPlaces.css'
import PlaceList from '../components/PlaceList'


const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Em State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlace ] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try{
        const responseData = await sendRequest(`http://localhost:4999/api/places/user/${userId}`);
        setLoadedPlace(responseData.places);
      } catch (err) {}
      }
    fetchPlaces();
  }, [sendRequest])


  
 




  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
