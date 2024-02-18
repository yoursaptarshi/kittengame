import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';
import { Link } from 'react-router-dom';
import cardicons from '../../images/card icons.png'
const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('yoursaptarshi@gmail.com');
  const [password, setPassword] = useState('test');
const logingHandler = ()=>{
  
   dispatch(login(email,password))
  console.log(email,password)
}
  return (
    <div className="login-container">
      <div className="background-animation"></div>
      <div className="login-form">
      <img src={cardicons} style={{width:'25vw'}}/>
      <div>
      <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            className="form-input"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            className="form-input"
          />
        </label>
      </div>
      
        <button type="button" onClick={logingHandler}  className="login-btn">
          Login
        </button>
        <p>
            Not registered yet? <Link to="/register">Register</Link>
          </p>
      </div>
    </div>
  );
};

export default Login;
