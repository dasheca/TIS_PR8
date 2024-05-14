import axios from 'axios';
import Specialist from '../components/Specialist';
import '../components/styles.css';
import React, { useState, useEffect } from 'react';

const SpecialistsPage = () => {
  const [specialists, setSpecialists] = useState([]);

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

  return (
    <div className="container">
      <div className="row">
        <Specialist specialists={specialists} />
      </div>
    </div>
  );
};

export default SpecialistsPage;
