import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/MainPage'; // Предполагается, что ваш компонент Main находится в файле Main.js в том же каталоге

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);
