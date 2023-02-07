import React from 'react'

import UserItem from './UserItem';
import Card from '../../shared/Card';
import './UserList.css'

export default function UserList(props) {
    if(props.items.length === 0) {
        return (
            <div>
                <Card>
                    <h2> No user</h2>
                </Card>
            </div>
        );
    }
    return (
        <ul className='user-list'>
            {props.items.map((user)=> 
                <UserItem 
                    key={user.userId}  
                    id={user._id} 
                    name={user.name}
                    image={user.image}
                    placeCount={user.places.length}/>)}
        </ul>
      );
  
}
