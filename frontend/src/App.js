import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home.jsx';
import Otp from './component/register/Otp';
import Register from './component/register/Register.jsx';
import Header from './component/header/Header.jsx';
import Login from './component/login/Login.jsx';
import Loader from './component/Loader/Loader.jsx';
import Game from './component/Game/Game.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './actions/user.js';

import Profile from './component/profile/Profile.jsx';

function App() {
  const dispatch = useDispatch();
 
  const {loading,isAuthenticated} = useSelector((state)=>state.user)
  useEffect(()=>{
    dispatch(loadUser());
   
  },[dispatch]);
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={loading ? <Loader/> : <Home />} />
        <Route path="/register" element={ <Otp />} />
        <Route path="/register/:email" element={loading ? <Loader/> : <Register />} /> 
        <Route path="/login" element={loading ? <Loader/> : (isAuthenticated ? <Game/> :<Login/>)} />
        <Route path="/profile" element={loading ? <Loader/> : (isAuthenticated ? <Profile/> :<Profile/>)} />
        <Route path="/play" element={isAuthenticated ? <Game/> :<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
