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
                                <label className="form-check-label text-white" htmlFor="pris">Price<span className="text-danger">*</span></label>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        id="pris"
                                        className="form-control"
                                        value={husData.pris}
                                        onChange={(e) => {
                                            // Inline updating of state
                                            setHusData({ ...husData, pris: e.target.value });
                                        }}
                                        pattern="^\d*\.?\d+$"  // Regex for positive numbers (including decimals)
                                        title="Please enter a valid price (positive numbers only)"
                                        min="0"
                                        required
                                    />
                                </div>


                                <label className="form-check-label text-white" htmlFor="romAntall">Amount of Rooms<span className="text-danger">*</span></label>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        id="romAntall"
                                        className="form-control"
                                        value={husData.romAntall}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="20"
                                        required
                                    />
                                </div>

                                <label className="form-check-label text-white" htmlFor="adresse">Address<span className="text-danger">*</span></label>
                                <div className="mb-3">
                                    <input type="text"
                                        id="adresse"
                                        className="form-control"
                                        value={husData.addresse}
                                        onChange={handleInputChange}
                                        required />
                                </div>


                                <label className="form-check-label text-white" htmlFor="by">City<span className="text-danger">*</span></label>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        id="by"
                                        className="form-control"
                                        value={husData.by}
                                        onChange={handleInputChange}
                                        pattern="[A-Za-z\s]+"  // Regex to allow only letters and spaces
                                        title="Please enter a valid city name (letters and spaces only)"
                                        required
                                    />
                                </div>



                                <label className="form-check-label text-white" htmlFor="erMoblert">Furnished?</label>
                                <div className="mb-3">
                                    <input type="checkbox"
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



                                <label className="form-check-label text-white" htmlFor="areal">Size m<sup>2</sup><span className="text-danger">*</span></label>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        id="areal"
                                        className="form-control"
                                        value={husData.areal}
                                        onChange={handleInputChange}
                                        min="20"  // Assuming area can't be negative
                                        max="10000"  // Example maximum limit; adjust as necessary
                                        required
                                    />
                                </div>

                                <label className="form-check-label text-white" htmlFor="beskrivelse">Description</label>
                                <div className="mb-3">
                                    <textarea
                                        id="beskrivelse"
                                        className="form-control"
                                        value={husData.beskrivelse}
                                        onChange={handleInputChange}
                                        required
                                        rows="5"
                                    />
                                </div>

                                <label className="form-check-label text-white" htmlFor="bilde">Upload Images</label>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        id="bilder"
                                        className="form-control"
                                        value={husData.bilder}
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


