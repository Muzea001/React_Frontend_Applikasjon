import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    navn: '',
    email: '',
    password: '',
    fodselsdato: '',
    telefonnummer: '',
    adresse: '',
    bekreftPassword: '',
  });

  const { navn, email, password, fodselsdato, telefonnummer, adresse, bekreftPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    const newUser = {
      navn: navn,
      email: email,
      password: password,
      telefonnummer: telefonnummer,
      fodselsdato: fodselsdato,
      addresse: adresse,
      bekreftPassword : bekreftPassword
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post('http://localhost:11569/api/Bruker/Registrer', body, config);

      console.log(res.data);
     
    } catch (err) {
      console.error(err.response.data);
     
    }
  };

  return (
    <section>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Register</h1>
            <form onSubmit={e => onSubmit(e)}>
              <label className="form-check-label text-white" htmlFor="navn">Name</label>
              <div className="mb-3">
                <input type="text" className="form-control" name="navn" value={navn} onChange={e => onChange(e)} required />
              </div>
              <label className="form-check-label text-white" htmlFor="email">Email</label>
              <div className="mb-3">
                <input type="email" className="form-control" name="email" value={email} onChange={e => onChange(e)} required />
              </div>
              <label className="form-check-label text-white" htmlFor="fodselsdato">Birth Date</label>
              <div className="mb-3">
                <input type="datetime-local" className="form-control" name="fodselsdato" value={fodselsdato} onChange={e => onChange(e)} required />
              </div>
              <label className="form-check-label text-white" htmlFor="telefonnummer">Phone Number</label>
              <div className="mb-3">
                <input type="text" className="form-control" name="telefonnummer" value={telefonnummer} onChange={e => onChange(e)} required />
              </div>
              <label className="form-check-label text-white" htmlFor="adresse">Address</label>
              <div className="mb-3">
                <input type="text" className="form-control" name="adresse" value={adresse} onChange={e => onChange(e)} required />
              </div>
              <label className="form-check-label text-white" htmlFor="password">Password</label>
              <div className="mb-3">
                <input type="password" className="form-control" name="password" value={password} onChange={e => onChange(e)} required />
              </div>
              
              <label className="form-check-label text-white" htmlFor="bekreftPassword">Confirm Password</label>
              <div className="mb-3">
                <input type="password" className="form-control" name="bekreftPassword" value={bekreftPassword} onChange={e => onChange(e)} required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;




