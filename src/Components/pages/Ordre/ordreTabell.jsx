import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrdreTabell = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrdreId, setSelectedOrdreId] = useState(null);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const result = await axios.get("http://localhost:11569/api/Ordre/Tabell");
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    const handleEditClick = (ordreId) => {
        navigate('/endreOrdre', { state: { ordreId } }); 
      };

    const handleDeleteClick = (ordreId) => {
        setSelectedOrdreId(ordreId);
        setDeleteErrorMessage('');
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:11569/api/Ordre/SlettBekreftet?id=${selectedOrdreId}`);
            setShowModal(false);
            fetchData(); 
        } catch (error) {
            console.error('Error deleting order: ', error);
            if (error.response && error.response.status === 400) {
                setDeleteErrorMessage(error.response.data || 'An unexpected error occurred');
            } else {
                setDeleteErrorMessage('A network error occurred');
            }
            setShowModal(true); 
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setDeleteErrorMessage('');
    };

        return (
            <div className="full-height-container bg-dark">
                <section>
                    <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Order List</h1>
                    <Table striped hover variant="dark">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Processed Through</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Price</th>
                                <th>House ID</th>
                                <th>Customer ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((ordre, index) => (
                                    <tr key={index}>
                                        <td>{ordre.ordreId}</td>
                                        <td>{ordre.betaltGjennom}</td>
                                        <td>{new Date(ordre.startDato).toLocaleDateString()}</td>
                                        <td>{new Date(ordre.sluttDato).toLocaleDateString()}</td>
                                        <td>{ordre.fullPris.toFixed(2)}</td>
                                        <td>{ordre.hus && ordre.hus.husId}</td>
                                        <td>{ordre.kunde && ordre.kunde.kundeID}</td>
                                        <td>
                                        
                                        <button className="btn btn-primary" onClick={() => handleEditClick(ordre.ordreId)}>Edit</button>
                                            
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={() => handleDeleteClick(ordre.ordreId)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No data found...</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </section>
        
                {/* Modal for delete confirmation */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {deleteErrorMessage ? 
                            <div className="alert alert-danger">{deleteErrorMessage}</div> : 
                            `Are you sure you want to delete the order with the ID ${selectedOrdreId}?`}
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

export default OrdreTabell;
