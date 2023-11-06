import React, { useEffect, useState, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table"
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const HusTabell = (props) => {





    const [show, setShow] = useState(false);
    const [husId, sethusId] = useState(0);
    const [bildeListe, setBildeListe] = useState([]);
    const [bildeUrl, setbildeUrl] = useState("");
    const [pris, setPris] = useState(0);
    const [beskrivelse, setBeskrivelse] = useState("");






    const navigate = useNavigate();

    const detailClick = (husId) => {
      navigate(`/oversikt/${husId}`);
    }


    const [data, setData] = useState([]);



    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get("http://localhost:11569/api/Hus/Tabell");
                setData(result.data);
                console.log(result.data)
                console.log(result.bildeListe);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchData();
    }, []);





    return (
        <div>
            {props.type == "Tabell" ?
                <Fragment>
                    <section>
                        <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">House Rental</h1>
                        <Table striped hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.pris}</td>
                                            <td>{item.beskrivelse}</td>
                                            <td>
                                                {item.bildeListe && item.bildeListe.length > 0 && (
                                                    <img
                                                        src={`http://localhost:11569${item.bildeListe[0].bilderUrl}`}
                                                        alt="House"
                                                        style={{ maxWidth: '80px', maxHeight: '80px' }}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <button className="btn btn-primary">Edit</button>
                                                <button className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No data found...</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </section>
                </Fragment>
                :
                
                <Fragment>                     
                <section>
  <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Your Page Title</h1>
  <div className="container">
    <div className="row">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 border-primary">
              {item.bildeListe && item.bildeListe.length > 0 && (
                <img
                  src={`http://localhost:11569${item.bildeListe[0].bilderUrl}`}
                  className="card-img-top"
                  alt="House"
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Price: {item.pris}</h5>
                <p className="card-text">{item.beskrivelse}</p>
                <button className="btn btn-primary mt-auto" onClick={()=> detailClick(item.husId)}>Details</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12">
          <p className="text-center">No data found...</p>
        </div>
      )}
    </div>
  </div>
</section> 
              </Fragment>   
            }
        </div>


    );

}


export default HusTabell;