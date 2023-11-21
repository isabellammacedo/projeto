import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import receitasData from '../assets/receitasData';

function Receitas() {

  const [showModal, setShowModal] = useState(false);
  const [selectedReceita, setSelectedReceita] = useState(null);

  const handleCardClick = (receita) => {
    setSelectedReceita(receita);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReceita(null);
  };

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="row bg-light justify-content-center">
                <div className="p-5 ml-5 col-6 text-center">
                    <h2 className="text-primary"><strong>Receitas</strong></h2>
                    <h5 className="informacao mt-2 text-secondary text-center">
                        Abaixo estão as receitas separadas para você:
                    </h5>
                </div>
            </div>
        </div>
        <div className="row p-5 d-flex justify-content-center">
        {receitasData.map((receita) => (
        <div key={receita.id} className="col-12 col-sm-5 col-lg-3 p-3">
            <Card>
            <Card.Img variant="top" src={receita.img} alt={`Imagem ${receita.titulo}`}  style={{ maxHeight: '200px', minHeight: '200px' }}/>
            <Card.Body>
                <Card.Title>{receita.titulo}</Card.Title>
                <Button className="text-white" variant="primary" onClick={() => handleCardClick(receita)}>
                Ver Receita
                </Button>
            </Card.Body>
            </Card>
        </div>
        ))}
        </div>
        <div className="p-0 m-0 row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="12 100 1440 180">
            <path fill="#f29f00" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>{selectedReceita && selectedReceita.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {selectedReceita && <p>{selectedReceita.descricao}</p>}
            </Modal.Body>
            <Modal.Footer>
            <Button className="text-white" variant="secondary" onClick={handleCloseModal}>
                Fechar
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
    )
  }
  
  export default Receitas;