import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('/allsignupforservice'); // Отправляем GET запрос на /allsignupforservice
        setRegistrations(response.data); // Устанавливаем полученные данные в состояние
        setLoading(false); // Устанавливаем loading в false, так как загрузка завершена
      } catch (error) {
        setError('Ошибка при загрузке регистраций'); // В случае ошибки, устанавливаем сообщение об ошибке
        setLoading(false); // Устанавливаем loading в false
      }
    };

    fetchRegistrations(); // Вызываем функцию для загрузки регистраций при монтировании компонента
  }, []);

  if (loading) {
    return <div>Загрузка...</div>; // Возвращаем компонент с сообщением о загрузке, пока данные загружаются
  }

  if (error) {
    return <div>{error}</div>; // Возвращаем компонент с сообщением об ошибке, если произошла ошибка при загрузке данных
  }

  return (
    <div>
      <h2>Список регистраций</h2>
      <ul>
        {registrations.map(registration => (
          <li key={registration.id}>
            <p>Дата: {registration.date}</p>
            <p>Время: {registration.time}</p>
            <p>Услуга: {registration.service}</p>
            <p>Специалист: {registration.specialist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
