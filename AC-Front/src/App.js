import React from 'react';
import './App.css';
import AuthenticationMenu from './pages/auth-menu/auth-menu';
import Home from './pages/home-page/home-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<AuthenticationMenu/>}/>
        <Route path='/register' element={<AuthenticationMenu/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
