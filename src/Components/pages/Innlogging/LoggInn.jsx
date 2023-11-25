import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const LoggInn = () => {
    const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
    
  });

  const { email, password, rememberMe } = loginData;

  const onChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.checked });
  }

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const body = JSON.stringify({ email, password, rememberMe });
      const response = await axios.post('http://localhost:11569/api/Bruker/LoggInn', body, config);

      console.log(response.data);
    } catch (error) {
      console.error(error.response.data); 
      setError(error);
    }
  };

  const navigate = useNavigate();

  const registerClick = () => {
    try {
      navigate(`/Innlogging/Register`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
      <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email Address</label>
            <input type="email" className="form-control" name="email" value={email} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={onChange} required />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="rememberMe" checked={rememberMe} onChange={handleCheckboxChange} />
            <label className="form-check-label text-white" htmlFor="rememberMe">Remember me</label>
          </div>
          <div className='mb-3'>
            <label className='form-label text-white' >Dont have an account ?</label>
            <button className="btn btn-primary mt-auto" onClick={()=> registerClick()}>Register</button>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  </div>
);
};

export default LoggInn;
