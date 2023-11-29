import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EndreOrdre = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ordreId = location.state?.ordreId;
  const [ordreData, setOrdreData] = useState({
    betaltGjennom: '',
    startDato: '',
    sluttDato: '',
    fullPris: '',
  });





  useEffect(() => {
    axios.get(`http://localhost:11569/api/Ordre/HentOrdreMedId/${ordreId}`)
      .then(response => {
        setOrdreData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, [ordreId]);
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setOrdreData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const homeClick = () => {
        
    try {
      navigate(`/ordreTabell`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ordreData) {
      console.log('Sending data to API:', ordreData); // For debugging
      axios.post('http://localhost:11569/api/Ordre/EndreBekreftet/', ordreData)
        .then(response => {
          // Check for appropriate success status code
          if (response.status === 200 || response.status === 201) {
            navigate('/ordreTabell');
          }
        })
        .catch(error => {
          console.error("Error updating order: ", error);
          // Further error handling (UI feedback, etc.)
        });
    }
  };

  function handleInputChange_Date(e) {
    const { id, value } = e.target;
    const newData = { ...ordreData, [id]: value };

    if (id === 'sluttDato' && new Date(newData.sluttDato) < new Date(ordreData.startDato)) {
      alert('End date cannot be earlier than the start date.');
      return; // Prevent state update
    }

    setOrdreData(newData);
  }


  return (
    <div className="full-height-container bg-dark">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Edit Order</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="betaltGjennom" className="form-label">Payment Method <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    id="betaltGjennom"
                    className="form-control"
                    value={ordreData.betaltGjennom}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="startDato" className="form-label">Start Date <span className="text-danger">*</span></label>
                  <input
                    type="datetime-local"
                    id="startDato"
                    className="form-control"
                    value={ordreData.startDato}
                    onChange={handleInputChange_Date}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="sluttDato" className="form-label">End Date <span className="text-danger">*</span></label>
                  <input
                    type="datetime-local"
                    id="sluttDato"
                    className="form-control"
                    value={ordreData.sluttDato}
                    onChange={handleInputChange_Date}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="fullPris" className="form-label">Full Price <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    id="fullPris"
                    className="form-control"
                    value={ordreData.fullPris}
                    onChange={handleInputChange}
                    required
                  />
                </div >
                <div className="mb-3 d-flex flex-column align-items-start">
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-secondary mt-2" onClick={homeClick}>Back to Table View</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndreOrdre;
