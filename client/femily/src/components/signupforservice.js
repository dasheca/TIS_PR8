import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUpForService = () => {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [services, setServices] = useState([]);
    const [error, setError] = useState('');
    const [masters, setMasters] = useState([]);
    const [selectedMaster, setSelectedMaster] = useState('');

    const decodeToken = (token) => {
        const tokenParts = token.split('.');
        const decodedPayload = JSON.parse(atob(tokenParts[1]));
        return decodedPayload;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
            const decodedToken = decodeToken(token);
            setUserId(decodedToken.userId);
            setEmail(decodedToken.email);
        }
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/service');
                if (response.data && response.data.rows && response.data.rows.length > 0) {
                    setServices(response.data.rows);
                } else {
                    setError('Ошибка при получении списка услуг: некорректные данные');
                }
            } catch (error) {
                setError('Ошибка при получении списка услуг: ' + error.message);
            }
        };

        const fetchMasters = async () => {
            try {
                const response = await axios.get('http://localhost:5000/specialist');
                if (response.data && response.data.rows && response.data.rows.length > 0) {
                    setMasters(response.data.rows);
                } else {
                    setError('');
                }
            } catch (error) {
                setError('Ошибка при получении списка мастеров: ' + error.message);
            }
        };
    
        fetchServices();
        fetchMasters();
    }, []);

    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    const handleMasterChange = (e) => {
        setSelectedMaster(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/signupforservice', {
                email,
                date,
                time,
                service: selectedService,
                master: selectedMaster
            });
            console.log('Response:', response.data);
            alert('Запись на услугу успешно создана!');
        } catch (error) {
            setError('Ошибка при создании записи на услугу: ' + error.message);
            alert('Произошла ошибка при создании записи на услугу. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div style={{marginLeft:'30vw', marginTop: '4vw'}}>
            <h2>Запись на услугу</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Дата:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    Время:
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </label>
                <br />
                <select value={selectedService} onChange={handleServiceChange} required>
                    <option value="">Выберите услугу...</option>
                    {services.map(service => (
                        <option key={service.id} value={service.id}>{service.title}</option>
                    ))}
                </select>
                <br />
                
                    <p>Мастер:      Сеченова Виктория</p>                    
                
                <br />
                <button type="submit">Записаться</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignUpForService;
