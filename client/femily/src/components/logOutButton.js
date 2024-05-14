import React from 'react';
import { Button } from 'react-bootstrap';

function LogoutButton({ onLogout }) {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена из localStorage
        onLogout(); // Вызов функции onLogout для выполнения дополнительных действий при выходе
    };

    return (
        <Button variant="danger" onClick={handleLogout} style={{ borderRadius: 0, background: '#DFC19F', color: 'black', border: '#DFC19F', maxHeight: '3vw', marginTop:'0.6vw' }}>
            ВЫХОД ИЗ ЛК
        </Button>
    );
}

export default LogoutButton;
