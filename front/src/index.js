import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '../src/custom_colors.scss';
import './styles/Agendamento.css';
import './styles/Cadastro.css';
import './styles/Login.css';
import './styles/PaginaInicial.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
