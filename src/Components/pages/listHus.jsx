
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";



const ListHus = () => {

    const [bildeListe, setBildeListe] = useState([]);
    const [bilderUrl, setBilderUrl] = useState("");
    const [pris, setPris] = useState(0);
    const [beskrivelse, setBeskrivelse] = useState("");
    const [romAntall, setRomAntall] = useState(0);
    const [areal, setAreal] = useState(0);
    const [by, setBy] = useState("");
    const [adresse, setAdresse] = useState("");
    const [harParkering, setHarParkering] = useState(false);
    const [eierKontoNummer, setEierKontoNummer] = useState(0);
    const [erMoblert, setErMoblert] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('pris', pris);
            formData.append('beskrivelse', beskrivelse);
            formData.append('romAntall', romAntall);
            formData.append('areal', areal);
            formData.append('by', by);
            formData.append('adresse', adresse);
            formData.append('harParkering', harParkering);
            formData.append('erMoblert', erMoblert);
            formData.append('eierKontoNummer', eierKontoNummer)
            bildeListe.forEach((image) => formData.append('bildeListe', image));
            formData.append('bilderUrl', bilderUrl);

            const response = await axios.post('http://localhost:11569/api/Hus/CreateHouseWithImages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error posting the data', error);
        }
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files); // Convert to array for easier manipulation
    
        // Create URLs for image previews
        const newImageUrls = files.map(file => URL.createObjectURL(file));
    
        // Assuming bilderUrl is meant to hold one URL for preview purposes,
        // you might want to consider how you want to handle multiple previews.
        // For now, we will only set the first image URL for preview.
        if (newImageUrls.length > 0) {
            setBilderUrl(newImageUrls[0]);
        }
    
        // Add the new files to the existing bildeListe
        setBildeListe(prevBildeListe => [...prevBildeListe, ...files]);
    };

    return (
        <Fragment>
            <section>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">List a new House</h1>
                            <form onSubmit={handleSubmit}>
                                <label className="form-check-label text-white" htmlFor="pris">
                                    Price
                                </label>
                                <div className="mb-3">
                                    <input type="number" className="form-control" value={pris} onChange={(e) => setPris(e.target.value)} />
                                </div>
                                <label className="form-check-label text-white" htmlFor="beskrivelse">
                                    Description
                                </label>
                                <div className="mb-3">
                                    <input type="text" className="form-control" value={beskrivelse} onChange={(e) => setBeskrivelse(e.target.value)} />
                                </div>
                                <label className="form-check-label text-white" htmlFor="harParkering">
                                    Amount of rooms
                                </label>
                                <div className="mb-3">
                                    <input type="number" className="form-control" value={romAntall} onChange={(e) => setRomAntall(e.target.value)} />
                                </div>
                                <label className="form-check-label text-white" htmlFor="romAntall">
                                    Address
                                </label>
                                <div className="mb-3">
                                    <input type="text" className="form-control" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                                </div>
                                <label className="form-check-label text-white" htmlFor="adresse">
                                    City
                                </label>

                                <div className="mb-3">
                                    <input type="text" className="form-control" value={by} onChange={(e) => setBy(e.target.value)}  />
                                </div>
                                <label className="form-check-label text-white" htmlFor="by">
                                    Furnished ?
                                </label>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="erMoblert"
                                        checked={erMoblert}
                                        onChange={(e) => setErMoblert(e.target.checked)} 
                                    />
                                </div>
                                <label className="form-check-label text-white" htmlFor="harParkering">
                                    Parking Available ?
                                </label>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="harParkering"
                                        checked={harParkering}
                                        onChange={(e) => setHarParkering(e.target.checked)}
                                    />
                                </div>
                                <label className="form-check-label text-white" htmlFor="eierKontoNummer">
                                    Owner Account Number
                                </label>
                                <div className="mb-3">
                                    <input type="text" className="form-control" value={eierKontoNummer} onChange={(e) => setEierKontoNummer(e.target.value)}  />
                                </div>
                                <label className="form-check-label text-white" htmlFor="harParkering">
                                    Size in sqm
                                </label>
                                <div className="mb-3">
                                    <input type="text" className="form-control" value={areal} onChange={(e) => setAreal(e.target.value)}  />
                                </div>

                                <label className="form-check-label text-white" htmlFor="harParkering">
                                    Upload Images
                                </label>
                                <div className="mb-3">
                                    <input type="file" className="form-control" onChange={handleImageUpload} multiple />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">List House</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default ListHus;