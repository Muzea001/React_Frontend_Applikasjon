import React, { useEffect, useState, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HusTabell = (props) => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedHusId, setSelectedHusId] = useState(null);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

    const navigate = useNavigate();

    const detailClick = (husId) => {
      navigate(`/oversikt/${husId}`);
    }
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const result = await axios.get("http://localhost:11569/api/Hus/Tabell");
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    const handleDeleteClick = (husId) => {
        setSelectedHusId(husId);
        setDeleteErrorMessage('');
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:11569/api/Hus/SlettBekreftet?id=${selectedHusId}`);
            setShowModal(false);
            fetchData(); // Refresh the data
        } catch (error) {
            console.error('Error deleting house: ', error);
            if (error.response && error.response.status === 400) {
                setDeleteErrorMessage(error.response.data || 'An unexpected error occurred');
            } else {
                setDeleteErrorMessage('A network error occurred');
            }
            setShowModal(true); // Keep the modal open to show the error
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setDeleteErrorMessage('');
    };

    return (
      <div className="full-height-container bg-dark">
            {props.type === "Tabell" ?
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
                                                <button 
                                                    className="btn btn-danger" 
                                                    onClick={() => handleDeleteClick(item.husId)}>
                                                    Delete
                                                </button>
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

            {/* Modal for delete confirmation */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {deleteErrorMessage ? 
                        <div className="alert alert-danger">{deleteErrorMessage}</div> : 
                        `Are you sure you want to delete the house with the ID ${selectedHusId}?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    {deleteErrorMessage ? 
                        <Button variant="primary" onClick={() => setDeleteErrorMessage('')}>Close</Button> : 
                        <Button variant="danger" onClick={handleConfirmDelete}>Confirm</Button>}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HusTabell;
