import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EndreHus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const husId = location.state?.husId; 
    const [husData, setHusData] = useState({
        pris: '',
        beskrivelse: '',
        romAntall: 0,
        addresse: '',
        by: '',
        erMoblert: false,
        harParkering: false,
        areal: '',
        
    });

    useEffect(() => {
        if (husId) {
            axios.get(`http://localhost:11569/api/Hus/Oversikt/${husId}`)
                .then(response => {
                    setHusData(response.data); 
                })
                .catch(error => {
                    console.error("Error fetching house data: ", error);
                });
        }
    }, [husId]); // Dependency array includes husId


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setHusData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleImageUpload = (e) => {
        setHusData(prevData => ({
            ...prevData,
            bilder: e.target.files 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        
        formData.append('husData', JSON.stringify(husData)); 

        
        if (husData.bilder) {
            Array.from(husData.bilder).forEach(file => {
                formData.append('bilder', file);
            });
        }

        axios.post('http://localhost:11569/api/Hus/EndreBekreftet', formData)
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    navigate('/husTabell');
                }
            })
            .catch(error => {
                console.error("Error updating house: ", error);
            });
    };

    return (
        <Fragment>
            <section>
                <div className="full-height-container bg-dark">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Edit House</h1>
                            <form onSubmit={handleSubmit}>
                                <label className="form-check-label text-white" htmlFor="pris">Price</label>
                                <div className="mb-3">
                                    <input  type="text"
                                     id="pris"
                                   className="form-control"
                                    value={husData.pris}
                                  onChange={handleInputChange}
                                  required />
                                </div>

                                
                                <label className="form-check-label text-white" htmlFor="beskrivelse">Description</label>
                                <div className="mb-3">
                                    <input  type="text"
                                     id="beskrivelse"
                                   className="form-control"
                                    value={husData.beskrivelse}
                                  onChange={handleInputChange}
                                  required />
                                </div>

                                
                                <label className="form-check-label text-white" htmlFor="romAntall">Amount of Rooms</label>
                                <div className="mb-3">
                                    <input  type="number"
                                     id="romAntall"
                                   className="form-control"
                                    value={husData.romAntall}
                                  onChange={handleInputChange}
                                  required />
                                </div>

                                
                                <label className="form-check-label text-white" htmlFor="adresse">Address</label>
                                <div className="mb-3">
                                    <input  type="text"
                                     id="adresse"
                                   className="form-control"
                                    value={husData.addresse}
                                  onChange={handleInputChange}
                                  required />
                                </div>

                               
                                <label className="form-check-label text-white" htmlFor="by">City</label>
                                <div className="mb-3">
                                    <input  type="text"
                                     id="by"
                                   className="form-control"
                                    value={husData.by}
                                  onChange={handleInputChange}
                                  required />
                                </div>

                                
                                <label className="form-check-label text-white" htmlFor="erMoblert">Furnished?</label>
                                <div className="mb-3">
                                    <input  type="checkbox"
                                     id="erMoblert"
                                   className="form-check-input"
                                    value={husData.pris}
                                    onChange={e => setHusData(prevData => ({
                                        ...prevData,
                                        erMoblert: e.target.checked
                                    }))}
                                   />
                                </div>

                                
                                <label className="form-check-label text-white" htmlFor="harParkering">Parking Available?</label>
                                <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    id="harParkering"
                                    className="form-check-input"
                                    checked={husData.harParkering || false}
                                    onChange={e => setHusData(prevData => ({
                                        ...prevData,
                                        harParkering: e.target.checked
                                    }))}
                                     />
                                    </div>
                                    

            
                                <label className="form-check-label text-white" htmlFor="areal">Size in sqm</label>
                                <div className="mb-3">
                                    <input  type="number"
                                     id="areal"
                                   className="form-control"
                                    value={husData.areal}
                                  onChange={handleInputChange}
                                  required />
                                </div>

                                
                                <label className="form-check-label text-white" htmlFor="bilde">Upload Images</label>
                                <div className="mb-3">
                                <input
                                    type="file"
                                    id="bilder"
                                    className="form-control"
                                    onChange={handleImageUpload}
                                    multiple
                                />
                            </div>

                                <button type="submit" className="btn btn-primary w-100">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EndreHus;
    
    
