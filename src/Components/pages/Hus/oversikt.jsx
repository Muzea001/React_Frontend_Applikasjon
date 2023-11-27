import React, { useEffect, useState, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table"
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Oversikt = () => {


  const [show, setShow] = useState(false);
  const { husId } = useParams();
  const [bildeListe, setBildeListe] = useState([]);
  const [bilderUrl, setbilderUrl] = useState("");
  const [pris, setPris] = useState(0);
  const [beskrivelse, setBeskrivelse] = useState("");
  const [currentIndex, setcurrentIndex] = useState(0);
  const [romAntall, setAntallrom] = useState(0);
  const [areal, setAreal] = useState(0);
  const [by, setBy] = useState("");
  const [addresse, setAddresse] = useState("");
  const [harparkering, setParkering] = useState(false);
  const [ermoblert, setMoblert] = useState("true");




  const [houseDetails, setHouseDetails] = useState({});


  const showImage = (offset) => {
    const totalImages = bildeListe.length;
    const newIndex = (currentIndex + offset + totalImages) % totalImages;
    setcurrentIndex(newIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:11569/api/Hus/Oversikt/${husId}`);
        const details = response.data;
        setHouseDetails(details);
        setBildeListe(details.bildeListe);
        setbilderUrl(details.bilderUrl)
        setPris(details.pris);
        setBeskrivelse(details.beskrivelse);
        setAntallrom(details.romAntall);
        setAreal(details.areal);
        setBy(details.by);
        setAddresse(details.addresse);
        setParkering(details.harparkering);
        setMoblert(details.ermoblert);
        console.log('Current image list:', bildeListe);
        console.log('Current index and image:', currentIndex, bildeListe[currentIndex]);
      } catch (error) {

      }
    };

    fetchData();
  }, [husId]);

  useEffect(() => {
    console.log('House details from API:', houseDetails);
  }, [houseDetails]); // This effect runs when `houseDetails` changes.


  const navigate = useNavigate();

  const detailClick = (husId, pris) => {
    console.log('Attempting to navigate with id and price:', husId, pris);
    try {
      navigate(`/lagOrdre/${husId}/${pris}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (

    <Fragment>
      <section>
      <div className="full-height-container bg-dark">
          <div className="row justify-content-center">
            <div className="col-md-8"> {/* Adjusted to col-md-8 for a larger column */}
              <div className="card item-card text-center"> {/* Added text-center for centering the image */}
                <img
                  id="imageDisplay"
                  alt={bildeListe[currentIndex]?.bilderUrl || 'Default Image'}
                  src={bildeListe[currentIndex] ? `http://localhost:11569${bildeListe[currentIndex].bilderUrl}` : '/default-image.jpg'}
                  className="card-img-top img-fluid mx-auto d-block"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary" onClick={() => showImage(-1)}>Previous</button>
                    <button className="btn btn-outline-primary" onClick={() => showImage(1)}>Next</button>
                  </div>
                </div>
              </div>

              <div className="card mt-3 text-center"> {/* Added text-center class here */}
                <div className="card-body">

                  <h5 className="card-title">House Details</h5>
                  {/* Wrap the property names with <strong> tags to make them bold */}
                  <p className="card-text"><strong>City:</strong> <span className="text-muted">{addresse}</span></p>
                  <p className="card-text"><strong>Areal:</strong> <span className="text-muted">{areal}</span></p>
                  <p className="card-text"><strong>City:</strong> <span className="text-muted">{by}</span></p>
                  <p className="card-text"><strong>Number of Rooms:</strong> <span className="text-muted">{romAntall}</span></p>
                  <p className="card-text"><strong>Parking:</strong> <span className="text-muted">{harparkering ? 'Yes' : 'No'}</span></p>
                  <p className="card-text"><strong>Furnishing:</strong> <span className="text-muted">{ermoblert ? 'Yes' : 'No'}</span></p>
                  <p className="card-text"><strong>Price:</strong> <span className="text-muted">{pris}</span></p>
                  <p className="card-text"><strong>Description:</strong> <span className="text-muted">{beskrivelse}</span></p>
                  <button className="btn btn-primary mt-auto" onClick={()=> detailClick(husId, pris)}>Reserve</button>
                  
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




