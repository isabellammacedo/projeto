import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, BrowserRouter } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './components/PaginaInicial';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Agendamento from './components/Agendamento';
import Sobre from './components/Sobre';
import Planos from './components/Planos';
import Cookies from 'js-cookie';


function App() {

  useEffect(() => {
    const loginInicial = async () => {
      try {
        const resposta = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: 'usuario@gmail.com',
            senha: '123456',
          }),
        });

        if (!resposta.ok) {
          throw new Error('Erro ao fazer login');
        }

        const dados = await resposta.json();
        Cookies.set('tokenGeral', dados.token);

      } catch (erro) {
        console.error(erro);
      }
    };

    loginInicial();
  }, []); 

  return (
    <Router>
      <div className="bg-primary text-white text-center p-1"><small>Esta semana estamos em promoção! Aproveite!</small></div>
      <div className='bg-primary'></div>
       <Navbar expand="lg">
        
       <Container>
          
          <Navbar.Brand as={NavLink} to="/" className="mx-3 my-1"><strong><span className='text-primary'>NUTRI</span><span className='informacao text-secondary'>FIT</span></strong></Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end mx-5'>
            <Nav className="ml-5">
              <Nav.Link as={NavLink} to="/" className="mx-3 my-1">Página Inicial</Nav.Link>
              <Nav.Link as={NavLink} to="/sobre" className="mx-3 my-1">Sobre Nós</Nav.Link>
              <Nav.Link as={NavLink} to="/planos" className="mx-3 my-1">Planos</Nav.Link>
              <Nav.Link as={NavLink} to="/login" className="mx-3 my-1">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/agendar" className="mx-3"><button type="submit" className="btn btn-outline-primary">
                Agende sua consulta!
              </button></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/planos" element={<Planos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agendar" element={<Agendamento />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;