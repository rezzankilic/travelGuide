import React from 'react'
import { useParams } from 'react-router-dom'

import './UserPlaces.css'
import PlaceList from '../components/PlaceList'


const PLACES =[
  {
  "id": "p1",
  "title": "Empire State Building",
  "description":"One of the highest building.",
  "imageUrl": "http:/...",
  "address": "20 W 34th St., New York, NY 10001",
  "location": {
    "lat": 40.7484,
    "lng": -73.98
  },
  "creator": "1" 
},
{
  "id": "5",
  "title": "Empire State Building",
  "description":"One of the highest building.",
  "imageUrl": "http:/...",
  "address": "20 W 34th St., New York, NY 10001",
  "location": {
    "lat": 40.7484,
    "lng": -73.98
  },
  "creator": "2"

}
]

export default function UserPages() {
  
  const userId = useParams().id;
  console.log(userId)

  const loadedPlaces = PLACES.filter(place => place.creator === userId);

  return (
    
    <PlaceList items={loadedPlaces}/>
  )
}
