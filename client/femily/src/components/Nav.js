import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './assets/logo.svg'; // Путь к изображению логотипа
import './styles.css'; // Подключаем CSS-файл для стилизации
import LogoutButton from './logOutButton'; // Импортируем компонент LogoutButton

const token = localStorage.getItem('token');
const isAdmin = true; // Здесь нужно определить, является ли пользователь администратором

function BasicExample() {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена из localStorage
        // Дополнительные действия при выходе
        console.log('Выход выполнен');
    };

    return (
        <Navbar expand="lg" className="navbar" variant='light'>
            <Navbar.Brand href="/" className="logo">
                <img src={logo} style={{ width: '15vw' }} alt="Логотип" className="logo-image" /> {/* Изображение логотипа */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />
            <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse" >
                <Nav className="ml-auto">
                    {!token && (
                        <>
                            <Nav.Item>
                                <Nav.Link href="/service" className="animated-link" style={{marginLeft: '4vw'}}>КАТАЛОГ</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/specialist" className="animated-link" style={{marginLeft: '3vw'}}>НАШИ МАСТЕРА</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/auth" className="animated-link" style={{marginLeft: '3vw'}}>ВХОД В ЛИЧНЫЙ КАБИНЕТ</Nav.Link>
                            </Nav.Item>
                        </>
                    )}
                    {token && (
                        <>
                            <Nav.Item>
                                <Nav.Link href="/service" className="animated-link" style={{marginLeft: '1vw'}}>КАТАЛОГ</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/specialist" className="animated-link">НАШИ МАСТЕРА</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/signuprofservice" className="animated-link">ЗАПИСАТЬСЯ НА УСЛУГУ</Nav.Link>
                            </Nav.Item>
                            
                            {/* Добавляем кнопку выхода */}
                            <LogoutButton onLogout={handleLogout} />
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default BasicExample;
