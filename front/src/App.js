import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './components/PaginaInicial';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Agendamento from './components/Agendamento';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Nutri Fit</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="mr-3">Página Inicial</Nav.Link>
              <Nav.Link as={Link} to="/login" className="mr-3">Login</Nav.Link>
              <Nav.Link as={Link} to="/cadastro" className="mr-3">Cadastre-se</Nav.Link>
              <Nav.Link as={Link} to="/agendar" className="mr-3">Agende sua consulta!</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agendar" element={<Agendamento />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </Router>
  );
}

export default App;
