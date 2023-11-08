
import React, { useEffect, useState, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table"
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const LagOrdre = ({ husId, pris }) => {
    const [betaltGjennom, setBetaltGjennom] = useState('');
    const [startDato, setStartDato] = useState('');
    const [sluttDato, setSluttDato] = useState('');
    const [fullPris, setFullPris] = useState(pris); 
    const [availabilityLabel, setAvailabilityLabel] = useState('');
    const [submitButtonVisible, setSubmitButtonVisible] = useState(false);
    const [availabilityError, setAvailabilityError] = useState('');
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form is submitted', { husId, startDato, sluttDato, betaltGjennom, fullPris });
      };


    const calculateFullPrice = async () => {
        if (startDato && sluttDato && pris) {
          try {
            
            const queryParams = new URLSearchParams({
              start: startDato,
              slutt: sluttDato,
              pris: pris
            });
                  const response = await fetch(`http://localhost:11569/api/Ordre/regnFullPris?${queryParams}`);
                        if (!response.ok) {
              throw new Error('Network response was not ok');
            }
                  const data = await response.json();
            
            setFullPris(data.fullprice);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        } else {
          console.error('Please ensure all fields are filled out correctly.');
        }
      };

  
      const checkAvailability = async () => {
        try {
         
          const response = await fetch(`http://localhost:11569/api/Ordre/SjekkTilgjengelighet?husId=${husId}&startDato=${startDato}&sluttDato=${sluttDato}`);
          const isAvailable = await response.json();
    
          
          if (!isAvailable) {
            setAvailabilityLabel('The selected dates are not available. Please choose different dates.');
            setSubmitButtonVisible(false);
          } else {
            setAvailabilityLabel("The selected dates are available.")
            setSubmitButtonVisible(true)
          }
        } catch (error) {
          setAvailabilityError('An error occurred while checking availability. Please try again.');
        }
      };


      useEffect(() => {
        if (startDato && sluttDato) {
          checkAvailability();
          calculateFullPrice();
        }
      }, [startDato, sluttDato]);

      
    


    
  
    return (
        <div className="container mt-4">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-header bg-secondary text-white">
              <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Create Order</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="betaltgjennom" className="form-label">Payment Method <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      id="betaltgjennom"
                      className="form-control"
                      value={betaltGjennom}
                      onChange={(e) => setBetaltGjennom(e.target.value)}
                      required
                    />
                  </div>
  
                  <div className="mb-3">
                    <label htmlFor="startDato" className="form-label">Start Date <span className="text-danger">*</span></label>
                    <input
                      type="datetime-local"
                      id="startDato"
                      className="form-control"
                      value={startDato}
                      onChange={(e) => setStartDato(e.target.value)}
                      required
                    />
                  </div>
  
                  <div className="mb-3">
                    <label htmlFor="sluttDato" className="form-label">End Date <span className="text-danger">*</span></label>
                    <input
                      type="datetime-local"
                      id="sluttDato"
                      className="form-control"
                      value={sluttDato}
                      onChange={(e) => setSluttDato(e.target.value)}
                      required
                    />
                  </div>
  
                  <div className="mb-3">
                    <label className="form-label">{availabilityLabel}</label>
                  </div>
  
                  {availabilityError && <div className="alert alert-danger" role="alert">{availabilityError}</div>}
  
                  <div className="mb-3">
                    <label htmlFor="fullPrice" className="form-label">Full Price</label>
                    <input
                      type="text"
                      id="fullPrice"
                      className="form-control"
                      value={fullPris}
                      readOnly
                    />
                  </div>
  
                  {submitButtonVisible && (
                    <button type="submit" className="btn btn-primary">Create Order</button>
                  )}
  
                  {/* Assuming you want to navigate back with a function or a link */}
                  <button type="button" className="btn btn-secondary mt-2">Back to Table View</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LagOrdre;