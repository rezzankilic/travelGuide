import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import Map from './shared/Map';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/hooks/auth-context';


function App() {
  const [isLoggedIn, setIsLoading] = useState(true)
  const[token, setToken] = useState(false);
  const[userId, setUserId] = useState(false);


  const login = useCallback((uid, token)=>{
    setToken(token);
    setUserId(uid);
  }, [])

  const logout = useCallback(()=>{
    setToken(null);
    setUserId(null);
  }, [])




  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId: userId, login:login, logout:logout}}>
      <div className="App">
        <BrowserRouter>
        <MainNavigation/>
        <main>
          <Routes>
          
              <>

                <Route path='/places/new' element={
                token ? (<NewPlace/>) : (<Navigate to='/auth' />)}/>

                <Route path='/places/:placeId' element = {
                token ? (<UpdatePlace />) : (<Navigate to='/auth' />)} />

              </>

            <Route path='/:userId/places' element={<UserPlaces/> } /> 
            
            <Route path='/' element={<Users/> } /> 
            
            <Route path='/auth' element={<Auth/> } /> 

          </Routes>
        </main>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );

}

export default App;
