import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import PORT from './config';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:${PORT}/user/registration`, formData);
      setMessage('Регистрация успешна!');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setMessage('Ошибка при регистрации');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}> 
        Регистрация
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Регистрация
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Электронная почта</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Введите email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
              <Form.Text className="text-muted">
                Мы никогда не будем делиться вашей электронной почтой с кем-либо еще.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Введите пароль" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Modal.Footer>
              {message && <p>{message}</p>}
              <Button variant="primary" type="submit">
                Зарегистрироваться
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterForm;
