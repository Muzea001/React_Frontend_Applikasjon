import React, { useEffect, useState, Fragment, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table"
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";

const Kvittering = () => {

const navigate = useNavigate();
    const {ordreId} = useParams();
    
    const [betaltGjennom, setBetaltGjennom] = useState('');
    const [startDato, setStartDato] = useState('');
    const [sluttDato, setSluttDato] = useState('');
    const [fullPris, setFullPris] = useState(''); 
    const [beskrivelse, setHusBeskrivelse] = useState('')
    const [husId, setHusAdresse] = useState('')
    const {user} = useContext(AuthContext);
    const [ordreInfo, setOrdreInfo] = useState({});


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:11569/api/Ordre/HentOrdreMedId/${ordreId}`);
            const details = response.data;
            setOrdreInfo(details);
            setBetaltGjennom(details.betaltGjennom);
            setStartDato(details.startDato)
            setSluttDato(details.sluttDato);
            setFullPris(details.fullPris);
            setHusBeskrivelse(details.hus.beskrivelse);
            setHusAdresse(details.hus.husId);
          } catch (error) {
            console.error ('Error fetching order data : ', error)
          }
        };
        fetchData();
    }, [ordreId]); 

    

    const homeClick = () => {
        
        try {
          navigate(`/`);
        } catch (error) {
          console.error('Navigation error:', error);
        }
      };
    

      return (

        <Fragment>
        <section>
        <div className="full-height-container bg-dark">
            <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Receipt</h1>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8"> 
                        <Table striped hover variant="dark">
                            <tbody>
                                <tr>
                                    <td><strong>Paid Through:</strong></td>
                                    <td>{betaltGjennom}</td>
                                </tr>
                                <tr>
                                    <td><strong>Start Date of Booking:</strong></td>
                                    <td>{startDato}</td>
                                </tr>
                                <tr>
                                    <td><strong>End Date of Booking:</strong></td>
                                    <td>{sluttDato}</td>
                                </tr>
                                <tr>
                                    <td><strong>Full Price of Stay:</strong></td>
                                    <td>{fullPris}</td>
                                </tr>
                                <tr>
                                    <td><strong>Description of House:</strong></td>
                                    <td>{beskrivelse}</td>
                                </tr>
                                <tr>
                                    <td><strong>House Id:</strong></td>
                                    <td>{husId}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="text-center">
                            <button className="btn btn-primary mt-4" onClick={homeClick}>Back To Homepage</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    </Fragment>
      );
};

    

export default Kvittering;