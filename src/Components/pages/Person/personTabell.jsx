import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const PersonTabell = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    useEffect(() => {


        fetchData();
    }, []);

        async function fetchData() {
            try {
                const result = await axios.get("http://localhost:11569/api/Person/Tabell");
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        

    const handleDeleteClick = (id) => {
        console.log("Selected Id for deletion", id)
        setSelectedPersonId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:11569/api/Person/SlettBekreftet?id=${selectedPersonId}`);
            setShowModal(false);
            fetchData(); // Refresh the data
        } catch (error) {
            console.error('Complete Error Object:', error);
            if (error.response) {
                console.log('Error response:', error.response);
                console.log('Error response data:', error.response.data); // Log the error response data
    
                // Extract the custom error message
                const errorMessage = error.response.data || 'An unexpected error occurred';
                setDeleteErrorMessage(errorMessage);
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
                <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Person List</h1>
                <Table striped hover variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((person, index) => (
                                <tr key={index}>
                                    <td>{person.navn}</td>
                                    <td>{new Date(person.fodselsdato).toLocaleDateString()}</td>
                                    <td>{person.addresse}</td>
                                    <td>{person.telefonNmr}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDeleteClick(person.id)}>Delete</button>
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
            `Are you sure you want to delete the person with the ID ${selectedPersonId}?`}
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

export default PersonTabell;
