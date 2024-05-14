import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/Auth';
import AdminPage from './pages/Admin';
import Service from './pages/ServicePage';
import Signupforservice from './pages/Signupforservice';
import Specialist from './pages/SpecialistPage';
import Header from './components/Nav';
import reportWebVitals from './reportWebVitals';
import MainPage from './pages/MainPage';
import './global.css'


function Root() {
  return (
    <React.StrictMode>
      <Header />
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/service" element={<Service />} />
          <Route path="/signuprofservice" element={<Signupforservice />} />
          <Route path="/specialist" element={<Specialist />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </React.StrictMode>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
reportWebVitals();
