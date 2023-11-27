
import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const EierTabell = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEierId, setSelectedEierId] = useState(null);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const result = await axios.get("http://localhost:11569/api/Eier/Tabell");
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    const handleDeleteClick = (kontoNummer) => {
        setSelectedEierId(kontoNummer);
        setDeleteErrorMessage('');
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:11569/api/Eier/SlettBekreftet?kontoNummer=${selectedEierId}`);
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error('Error deleting owner: ', error);
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
            <section >
                <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Owner List</h1>
                <Table striped hover variant="dark">
                    <thead>
                        <tr>
                            <th>Account Number</th>
                            <th>Name</th>
                            <th>House Ids</th>
                            <th>Number of Ads</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((eier, index) => (
                                <tr key={index}>
                                    <td>{eier.kontoNummer}</td>
                                    <td>{eier.person && eier.person.navn}</td>
                                    <td>
                                        {eier.husListe && eier.husListe.length > 0 
                                            ? eier.husListe.map(hus => hus.husId).join(", ") 
                                            : 'No Houses'}
                                    </td>
                                    <td>
                                        {eier.antallAnnonser}
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={() => handleDeleteClick(eier.kontoNummer)}>
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
                        `Are you sure you want to delete the owner with the ID ${selectedEierId}?`}
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

export default EierTabell;
