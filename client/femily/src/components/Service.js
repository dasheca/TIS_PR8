import React, { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import axios from 'axios';

const Service = () => {
    const [services, setServices] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const isAuthenticated = localStorage.getItem('token') !== null;
    const [showLoginAlert, setShowLoginAlert] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/service?page=${currentPage}&limit=6`);
                if (Array.isArray(response.data.rows)) {
                    setServices(response.data.rows);
                    setIsLastPage(response.data.rows.length < 3); // Проверка на последнюю страницу
                } else {
                    console.error('Ошибка: данные не являются массивом:', response.data);
                }
            } catch (error) {
                console.error('Ошибка при загрузке услуг:', error);
            }
        };

        fetchServices();
    }, [currentPage]);

    const handleModalShow = (service) => {
        setSelectedService(service);
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
        setSelectedService(null);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };
    
    const handleSignUpForService = () => {
        if (isAuthenticated) {
            // Перенаправление на страницу записи на услугу
            window.location.href = 'http://localhost:3000/signuprofservice';
        } else {
            // Показываем уведомление о необходимости войти в систему
            setShowLoginAlert(true);
        }
    };

    return (
        <>
            <div>
                <div className="title_service">НАШИ УСЛУГИ</div>
                <div className="card-container" style={{maxHeight: '10vw', maxWidth: '15vw', alignItems: 'center', marginLeft: '50vw'}}>
                    {services.map(service => (
                        <div key={service.id} className="card">
                            <Card.Img variant="top" style={{maxHeight: '10vw', maxWidth: '15vw'}} src={`static/${service.photo}`} />
                            <Card.Body>
                                <Card.Title>{service.title}</Card.Title>
                                <Card.Text>{service.description}</Card.Text>
                                <Card.Text>Цена: {service.price}</Card.Text>
                                <Button variant="primary" onClick={() => handleModalShow(service)}>
                                    Подробнее
                                </Button>
                                <Button variant="primary" onClick={() => handleSignUpForService()}>
                                    Записаться на услугу
                                </Button>
                            </Card.Body>
                        </div>
                    ))}
                </div>
                <div className="pagination-buttons">
                    <Button variant="primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                        Предыдущая страница
                    </Button>
                    <Button variant="primary" onClick={handleNextPage} disabled={isLastPage}>
                        Следующая страница
                    </Button>
                </div>
                <Modal show={showLoginAlert} onHide={() => setShowLoginAlert(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Войдите в систему</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Для записи на услугу необходимо войти в систему. Пожалуйста, авторизуйтесь или зарегистрируйтесь.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowLoginAlert(false)}>
                            Закрыть
                        </Button>
                        <Button variant="primary" href="/auth">
                            Войти
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default Service;
