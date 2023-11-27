import React, { useEffect, useState, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const KundeTabell = (props) => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedKundeId, setSelectedKundeId] = useState(null);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const result = await axios.get("http://localhost:11569/api/Kunde/Tabell");
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    const handleDeleteClick = (kundeId) => {
        setSelectedKundeId(kundeId);
        setDeleteErrorMessage('');
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:11569/api/Kunde/SlettBekreftet?id=${selectedKundeId}`);
            setShowModal(false);
            fetchData(); // Refresh the data
        } catch (error) {
            console.error('Error deleting customer: ', error);
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
            <section>
                <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Customer List</h1>
                <Table striped hover variant="dark">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                            <th>Orders</th>
                            <th>Houses</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((kunde, index) => (
                                <tr key={index}>
                                    <td>{kunde.kundeID}</td>
                                    <td>{kunde.person && kunde.person.navn}</td>
                                    <td>
                                        {kunde.ordreListe ? kunde.ordreListe.join(", ") : 'No Orders'}
                                    </td>
                                    <td>
                                        {kunde.husListe ? kunde.husListe.join(", ") : 'No Houses'}
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={() => handleDeleteClick(kunde.kundeID)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No data found...</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </section>

            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {deleteErrorMessage ? 
                        <div className="alert alert-danger">{deleteErrorMessage}</div> : 
                        `Are you sure you want to delete the customer with the ID ${selectedKundeId}?`}
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

export default KundeTabell;
