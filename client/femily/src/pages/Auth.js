import React, { useState } from "react";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";
import LogoutButton from "../components/logOutButton";

const token = localStorage.getItem('token');

const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogout = () => {
        setIsLoggedIn(false); // Обновляем состояние для выхода пользователя
    };

    return (
        <div>
            <LoginForm />
            <RegisterForm />
            {token && (
            <div>
                {isLoggedIn ? (
                    <div>
                        <h1>Добро пожаловать!</h1>
                        <LogoutButton onLogout={handleLogout} /> {/* Передача функции onLogout */}
                    </div>
                ) : (
                    <h1>Вы успешно вышли из системы</h1>
                )}
            </div>
            )}
            Страница авторизации и регистрации
        </div>
    );
}

export default Auth;
