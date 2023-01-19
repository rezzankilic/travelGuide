import React from 'react'

import './UserPlaces.css'
import PlaceList from '../components/PlaceList'

export default function UserPages() {
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
    "creator": "u1" 
  },
  {
    "id": "p2",
    "title": "Empire State Building",
    "description":"One of the highest building.",
    "imageUrl": "http:/...",
    "address": "20 W 34th St., New York, NY 10001",
    "location": {
      "lat": 40.7484,
      "lng": -73.98
    },
    "creator": "u2"

  }
]
  return (
    <PlaceList items={PLACES}/>
  )
}
