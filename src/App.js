import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

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
          <Route path='/:id/places' element={<UserPlaces />} />

        </Routes>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
