import React from 'react';
import logo from '../components/assets/logo.svg';

const Footer = () => {
    return (
        <footer className="footer" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="footer-center">
                <img src={logo} style={{ width: '15vw', alignItems: 'center' }} alt="Логотип" className="logo-image" />
            </div>
        </footer>
    );
}

export default Footer;
