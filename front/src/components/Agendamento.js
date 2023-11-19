import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Agendamento = () => {
  const [nutricionistas, setNutricionistas] = useState([]);
  const [nutricionistaSelecionado, setNutricionistaSelecionado] = useState('');
  const [crnSelecionado, setCrnSelecionado] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);  
  const [token, setToken] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowModal(false);
    if (redirect) {
      setRedirect(false);
    }
  };

  const handleModalLoginClose = () => {
    setShowModal(false);
    if (redirect) {
      setRedirect(false);
      // Redireciona para a página de login
      navigate('/login');
    }
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalLoginShow = () => {
    setShowModalLogin(true);
  };

  useEffect(() => {
    const tokenUsuarioLogado = Cookies.get('token');
    setToken(tokenUsuarioLogado);

    if (!tokenUsuarioLogado) {
      // Se não houver token, exibe o modal informando e redireciona para o Login
      handleModalLoginShow();
      setRedirect(true);
    } else {
      const fetchData = async () => {
        try {
          const resposta = await fetch('/nutricionistas', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${tokenUsuarioLogado}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (!resposta.ok) {
            throw new Error('Erro ao buscar nutricionistas');
          }
  
          const dados = await resposta.json();
          setNutricionistas(dados);
        } catch (erro) {
          console.error(erro);
        }
      };
  
      fetchData();
    }
  }, [redirect]);

  const handleNutricionistaChange = (event) => {
    const nutricionistaId = event.target.value;

    if (nutricionistaId === "") {
      // Reseta o CRN quando "Selecione" é escolhido
      setNutricionistaSelecionado('');
      setCrnSelecionado('');
    } else {
      // Pega o CRN do nutri selecionado
      const nutricionistaSelecionado = nutricionistas.find(n => n.id === parseInt(nutricionistaId));
      if (nutricionistaSelecionado) {
        setCrnSelecionado(nutricionistaSelecionado.crn);
      }
    }

    // Atualiza o nutricionista selecionado
    setNutricionistaSelecionado(nutricionistaId);
};

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const resposta = await fetch('/consultas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idPaciente: 1,
          idNutricionista: nutricionistaSelecionado,
          motivoDaConsulta: motivoConsulta,
        }),
      });

      if (!resposta.ok) {
        throw new Error('Erro ao agendar consulta');
      }

      handleModalShow();
    } catch (erro) {
      console.error(erro);
    }
  };

  const [motivoConsulta, setMotivoConsulta] = useState('');

  const handleMotivoConsultaChange = (event) => {
    setMotivoConsulta(event.target.value);
  };

  return (
    <div className="container-fluid">
            <div className="row bg-light justify-content-center">
                <div className="p-5 ml-5 col-6 text-center">
                    <h2 className="text-primary"><strong>Agendar Consulta</strong></h2>
                    <h5 className="informacao mt-2 text-secondary text-center">
                        Preencha o formulário abaixo para agendar sua consulta
                    </h5>
                </div>
            </div>
            <div className="container">              
                <div className="row mt-5">
                    <div className="col-8 offset-2">
                        {/* idNutricionista, nome e crn, motivo da consulta */}
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="my-3 col-9">
                                    <label htmlFor="nutricionista" className="form-label font-weight-bold">
                                    <strong>Selecione o nutricionista:</strong>
                                    </label>
                                    <select
                                    className="form-select"
                                    id="nutricionista"
                                    required
                                    value={nutricionistaSelecionado}
                                    onChange={handleNutricionistaChange}
                                    >
                                    <option value="">Selecione</option>
                                    {nutricionistas.map((nutricionista) => (
                                        <option key={nutricionista.id} value={nutricionista.id}>
                                        {nutricionista.nome}
                                        </option>
                                    ))}
                                    </select>
                                </div>

                                <div className="my-3 col-3">
                                    <label htmlFor="crnSelecionado" className="form-label font-weight-bold">
                                    <strong>CRN</strong>
                                    </label>
                                    <input
                                    type="text"
                                    value={crnSelecionado}
                                    className="form-control"
                                    id="crnSelecionado"
                                    placeholder="CRN"
                                    readOnly
                                    />
                                </div>
                            </div>
                            <div className="my-3 row">
                                <div>
                                    <label htmlFor="motivoConsulta" className="form-label">
                                        <strong>
                                        Conte-nos um pouco sobre o motivo de sua consulta:
                                        </strong>
                                    </label>
                                    <textarea className="form-control" 
                                    id="motivoConsulta" 
                                    placeholder='Digite aqui o motivo de sua consulta' 
                                    rows="3" 
                                    value={motivoConsulta}
                                    onChange={handleMotivoConsultaChange}
                                    required ></textarea>
                                </div>
                                <div className="my-2 informacao">
                                    <p>
                                        Essas informações serão enviadas para o nutricionista selecionado, então tente detalhar os motivos que o(a) levaram a agendar esta consulta! 
                                    </p>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary mt-3 col-sm-6 text-white col-lg-3">
                                    Agendar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="p-0 m-0 row">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 289">
                    <path fill="#f29f00" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                <Modal.Title>Consulta Agendada!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Sua consulta foi agendada com sucesso! :)
                <br/>Em breve, o nutricionista entrará em contato com você para confirmar o endereço, a data e horário da consulta.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary text-white" onClick={handleModalClose}>
                    Fechar
                </Button>
                </Modal.Footer>
            </Modal>

              {/* Modal de Login */}
            <Modal show={showModalLogin} onHide={handleModalLoginClose}>
              <Modal.Header closeButton>
              <Modal.Title>Usuário não logado!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              Para agendar sua consulta, você deve estar logado(a).
              <br /> Você será redirecionado(a) para a página de Login!
              </Modal.Body>
              <Modal.Footer>
              <Button variant="secondary text-white" onClick={handleModalLoginClose}>
              Fechar
              </Button>
              </Modal.Footer>
            </Modal>

    </div>
  );
};

export default Agendamento;
