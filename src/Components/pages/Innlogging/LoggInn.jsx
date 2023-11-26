import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../AuthContext';

const LoggInn = () => {
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

 
  const { email, password, rememberMe } = loginData;

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  const onChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.checked });
  };

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
  
      if (response.status === 200) {
        setUser({ email: email, isAuthenticated: true });
        navigate('/');
      } else {
        setError('Login failed. No response data.');
      }
  
    } catch (err) {
      console.error(err.response ? err.response.data : err); 
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  const registerClick = () => {
    try {
      navigate(`/Innlogging/Register`);
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Login</h1>
          {error && <div className="alert alert-danger">{error}</div>}
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
              <label className='form-label text-white' >Don't have an account?</label>
              <button type="button" className="btn btn-primary mt-auto" onClick={registerClick}>Register</button>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoggInn;
