import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PORT } from './config'; // Make sure to import PORT correctly

const RegistrationsList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`http://localhost:${PORT}/user/allservice`);
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error loading registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Registrations List</h2>
      <ul>
        {registrations.map(registration => (
          <li key={registration.id}>
            <p>Date: {registration.date}</p>
            <p>Time: {registration.time}</p>
            <p>Service: {registration.service}</p>
            <p>Specialist: {registration.specialist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegistrationsList;
