import React, {useState} from 'react'

import UserList from '../components/UserList'
import Image1 from '../../images/pexels-kássia-melo-15071001.jpg'

export default function Users() {
    const USERS = [
        {
    "userId": "1",  
    "name": "ASHLEY",
    "image": Image1,
    "placeCount": 3,
    },
    {
      "userId": "2",  
      "name": "Homes",
      "image": Image1,
      "placeCount": 4,
      }
]
  return (
    <div><UserList items={USERS}/> </div>
  )
}
