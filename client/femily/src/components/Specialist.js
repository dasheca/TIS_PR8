import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './styles.css'; // Подключаем CSS для стилизации

const Specialist = () => {
    const [specialists, setSpecialists] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);

    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/specialist`);
                setSpecialists(response.data);
            } catch (error) {
                console.error('Error fetching specialists:', error);
            }
        };

        fetchSpecialists();
    }, []);

    const handleModalShow = (specialist) => {
        setSelectedSpecialist(specialist);
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
        setSelectedSpecialist(null);
    };

    return (
        <Row xs={1} sm={2} md={3} className="g-4">
            {specialists.map(item => (
                <Col key={item.id} xs={12} sm={6} md={4}>
                    <Card
                        className="h-100"
                        style={{ border: '0.3vw solid #DFC19F', borderRadius: '0', marginBottom: '1vw' }}
                        onClick={() => handleModalShow(item)}
                    >
                        <Card.Img variant="top" src={`static/${item.photo}`} style={{ borderRadius: '0' }} />
                        <Card.Body>
                            <Card.Title className="cormorant" style={{ fontWeight: 'bold', fontSize: '2vw' }}>{item.FIO}</Card.Title>
                            <Card.Text className="cormorant" style={{ fontSize: '1.8vw' }}>{item.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            {selectedSpecialist && (
                <Modal show={modalShow} onHide={handleModalClose} size="md" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Detailed Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>{selectedSpecialist.FIO}</h2>
                        <p>Description: {selectedSpecialist.description}</p>
                        <p>Experience: {selectedSpecialist.experience}</p>
                        {/* Add additional information about the specialist if needed */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Row>
    );
};

export default Specialist;
