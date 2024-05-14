// LoginForm.js
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import PORT from './config';

function LoginForm({ onLogin }) {
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const [userData, setUserData] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:${PORT}/user/login`, loginFormData);
            const { token } = response.data;
            localStorage.setItem('token', token);

            const userDataResponse = await axios.get(`http://localhost:${PORT}/user/auth`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { user } = userDataResponse.data;

            setUserData(user);
            onLogin(token);
            setModalShow(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleModalClose = () => {
        setModalShow(false);
    };

    const handleModalShow = () => {
        setModalShow(true);
    };

    return (
        <>
            <Button variant="primary" onClick={handleModalShow}> 
                Вход
            </Button>

            <Modal
                show={modalShow}
                onHide={handleModalClose}
                size="md"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Вход</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLoginSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите логин"
                                name="email"
                                value={loginFormData.email}
                                onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                name="password"
                                value={loginFormData.password}
                                onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">Войти</Button>
                        </Modal.Footer> 
                    </Form>
                </Modal.Body>
            </Modal>

            {userData && (
                <div>
                    <h2>Данные пользователя:</h2>
                    <p>Email: {userData.email}</p>
                    <p>Роль: {userData.role}</p>
                </div>
            )}
        </>
    );
}

export default LoginForm;
