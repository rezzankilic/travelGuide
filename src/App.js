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
  const[isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(()=>{
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(()=>{
    setIsLoggedIn(false)
  }, [])




  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login:login, logout:logout}}>
      <div className="App">
        <BrowserRouter>
        <MainNavigation/>
        <main>
          <Routes>
          
              <>

                <Route path='/places/new' element={
                isLoggedIn ? (<NewPlace/>) : (<Navigate to='/auth' />)}/>

                <Route path='/places/:placeId' element = {
                isLoggedIn ? (<UpdatePlace />) : (<Navigate to='/auth' />)} />

              </>

            <Route path='/:userId/places' element={<UserPlaces/> } /> 
            
            <Route path='' element={<Users/> } /> 
            
            <Route path='/auth' element={<Auth/> } /> 

          </Routes>
        </main>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );

}

export default App;
