import './App.css';
import Home from './components/Home';
import Register from './components/Register'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DisplayUsers from './components/DisplayUsers';
import Login from './components/Login';
import UpdateUsers from './components/UpdateUsers'
import Adminlogin from './components/Adminlogin'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />  
        <Route path="/register" element={<Register />} />
        <Route path="/displayUsers" element={<DisplayUsers/>}/>  
        <Route path="/login" element={<Login/>}/>
        <Route path='/update/:id' element={<UpdateUsers/>}/>
        <Route path='/adminlogin' element={<Adminlogin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
