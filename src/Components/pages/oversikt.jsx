import React, { useEffect, useState, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table"
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";


const Oversikt = () => {


    const [show, setShow] = useState(false);
    const {husId} = useParams();
    const [bildeListe, setBildeListe] = useState([]);
    const [bildeUrl, setbildeUrl] = useState("");
    const [pris, setPris] = useState(0);
    const [beskrivelse, setBeskrivelse] = useState("");
    const [currentIndex, setcurrentIndex] = useState(0);
    const [antallrom, setAntallrom] = useState(0);
    const [areal, setAreal] = useState(0);
    const [by, setBy]= useState("");
    const [addresse, setAddresse]= useState("");
    const [harparkering, setParkering] = useState(false);
    const [ermoblert, setMoblert] = useState("true");
    const [loading ,setLoading] = useState("true");



    const [houseDetails, setHouseDetails] = useState([]);


    const showImage = (offset) => {


        const newIndex = (currentIndex + offset + bildeUrl.length) % bildeUrl.length
        setcurrentIndex(newIndex);
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:11569/api/Hus/Oversikt/${husId}`);
            setHouseDetails(response.data);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error("Error fetching data: ", error.message);
              if (error.response) {
                console.error("Error response data: ", error.response.data);
                console.error("Error response status: ", error.response.status);
              }
            } else {
              console.error("An unexpected error occurred: ", error);
            }
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, [husId]); // Dependency array ensures this effect runs when husId changes
      
      // After state updates, if you want to log or use the new data, 
      // it's better to use useEffect that depends on the `houseDetails` state.
      
      useEffect(() => {
        console.log('House details from API:', houseDetails);
      }, [houseDetails]); // This effect runs when `houseDetails` changes.

        return (

            <Fragment>                     
                <section>
             <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card item-card">
            <img
              id="imageDisplay"
              alt={bildeListe[currentIndex]?.bilderUrl || 'Default Image'}
              src={bildeListe[currentIndex]?.bilderUrl || '/default-image.jpg'}
              className="card-img-top img-fluid"
              style={{ maxWidth: '300px', maxHeight: '200px' }}
            />
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-primary" onClick={() => showImage(-1)}>Previous</button>
                <button className="btn btn-outline-primary" onClick={() => showImage(1)}>Next</button>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">House Details</h5>
              <p className="card-text">City: <span className="text-muted">{addresse}</span></p>
              <p className="card-text">Areal: <span className="text-muted">{areal}</span></p>
              <p className="card-text">City: <span className="text-muted">{by}</span></p>
              <p className="card-text">Number of Rooms: <span className="text-muted">{antallrom}</span></p>
              <p className="card-text">Parking: <span className="text-muted">{harparkering ? 'Yes' : 'No'}</span></p>
              <p className="card-text">Price: <span className="text-muted">{pris}</span></p>
              <p className="card-text">Description: <span className="text-muted">{beskrivelse}</span></p>
              <button className="btn btn-primary" onClick={() => {/* logic to handle reservation */}}>
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    </Fragment>
  );
};



export default Oversikt




        