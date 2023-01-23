import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import Map from './shared/Map';
import UpdatePlace from './places/pages/UpdatePlace';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <MainNavigation/>
      <main>
        <Routes>
          <Route path='/' element = {<Users/>} />
          <Route path='/places/new' element={<NewPlace/>}/>
          <Route path='/redirect' element={<Navigate to='/' /> } />
          <Route path='/:userId/places' element={<UserPlaces />} />
          <Route path='/map' element={<Map /> } />
          <Route path='/places/:placeId' element = {<UpdatePlace />} />

        </Routes>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
