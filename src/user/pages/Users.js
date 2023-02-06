import React, {useState, useEffect} from 'react'

import UserList from '../components/UserList'
import ErrorModal from '../../shared/ErrorModal';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


export default function Users() {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();


      useEffect(()=>{
        const fetchUsers = async() =>{
        try{
          const responseData = await sendRequest('http://localhost:4999/api/users');
          setLoadedUsers(responseData.users);
        } catch (err) {};
        };
        fetchUsers();
      }, [sendRequest]);

    
  return (
    <>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    )}
    {!isLoading && loadedUsers &&
     <div><UserList items={loadedUsers}/> </div>}
    </>
  )
}
