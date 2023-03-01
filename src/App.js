import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
// import Users from './user/pages/Users';
// import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/MainNavigation';
// import UserPlaces from './places/pages/UserPlaces';
import Map from './shared/Map';
// import UpdatePlace from './places/pages/UpdatePlace';
// import Auth from './user/pages/Auth';
import { AuthContext } from './shared/hooks/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/LoadingSpinner';

const Users = React.lazy( () => import('./user/pages/Users'));
const NewPlace = React.lazy( () => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy( () => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy( () => import('./places/pages/UpdatePlace'));
const Auth = React.lazy( () => import('./user/pages/Auth'));


function App() {
  const {token, login, logout, userId} = useAuth();

  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId: userId, login:login, logout:logout}}>
      <div className="App">
        <BrowserRouter>
        <MainNavigation/>
        <main>
          <Routes>
          
              <>

                <Route path='/places/new' element={
                  <Suspense fallback={<div className='center'> <LoadingSpinner/> </div>}>
                    token ? (<NewPlace/>) : (<Navigate to='/auth' />)
                  </Suspense>
                }/>

                <Route 
                  path='/places/:placeId' 
                  element = {
                    <Suspense fallback={<div className='center'> <LoadingSpinner/> </div>}>
                      token ? (<UpdatePlace />) : (<Navigate to='/auth' />)
                    </Suspense>
                  } />

              </>

            <Route 
              path='/:userId/places' 
              element={
                <Suspense fallback={<div className='center'> <LoadingSpinner/> </div>}>
                  <UserPlaces/> 
                </Suspense>
              } /> 
            
            <Route 
              path='/'
              element={
                <Suspense fallback={<div className='center'> <LoadingSpinner/> </div>}>
                  <Users/>
                </Suspense>
              } /> 
            
            <Route 
              path='/auth' 
              element={
                <Suspense fallback={<div className='center'> <LoadingSpinner/> </div>}>
                  <Auth/> 
                </Suspense>
              } /> 

          </Routes>
        </main>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );

}

export default App;
