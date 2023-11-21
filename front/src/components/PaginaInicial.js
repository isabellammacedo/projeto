import '../styles/PaginaInicial.css';
import Imagem1 from '../assets/images/paginaInicial.png';
import { Row, Col, Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFileAlt, faClock, faDollarSign, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


function Home() {

  const CustomPrev = ({ onClick }) => (
    <button className="controls control-left" onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
  
  const CustomNext = ({ onClick }) => (
    <button className="controls control-right" onClick={onClick}>
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );

  return (
    <>
      <div className="container-fluid bg-light">
        <div className="row align-items-center px-5 pt-5">
          <div className="col-lg-6">
              <div className="mb-5 mb-lg-0 text-center text-lg-end">
                  <h1 className="mb-3">Seja bem-vindo(a) à <strong><span className='text-primary'>NUTRI</span><span className='informacao text-secondary'>FIT</span></strong></h1>
                  <h3 className="mb-5 informacao">Contectamos Nutricionistas e Pacientes!</h3>
              </div>
          </div>
          <div className="col-lg-3 col-sm-12 text-center">
          <img className="imagemInicial" src={Imagem1} alt="Imagem de duas mulheres, sendo uma nutricionista e a outra paciente." />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="row px-5 pb-5">
          <h3 className="informacao text-secondary text-center">Vantagens de utilizar nossa plataforma:</h3>
        </div>
        <Carousel
          prevIcon={<CustomPrev />}
          nextIcon={<CustomNext />}
          indicators={false}
        >
          <Carousel.Item interval={4000}>
            <Row className="justify-content-center">
              <Col md={5}>
                <Card className="mt-2">
                  <Card.Body>
                    <FontAwesomeIcon icon={faUsers} size="2x" className="mb-2 text-primary" />
                    <Card.Title>Interação entre o Nutricionista e o Paciente</Card.Title>
                    <Card.Text>
                      Aqui o nutricionista consegue prescrever exames de sangue, cardápios, bem como incluir receitas para o seu paciente.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="mt-2">
                  <Card.Body>
                    <FontAwesomeIcon icon={faDollarSign} size="2x" className="mb-2 text-primary" />
                    <Card.Title>Custo Acessível</Card.Title>
                    <Card.Text>
                    Os planos disponíveis da NutriFit são acessíveis e na assinatura anual há o desconto de 25% do valor.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <Row className="justify-content-center">
              <Col md={5}>
                <Card className="mt-2">
                  <Card.Body>
                    <FontAwesomeIcon icon={faFileAlt} size="2x" className="mb-2 text-primary" />
                    <Card.Title>Orientações Alimentares Individuais</Card.Title>
                    <Card.Text>
                      O nutricionista terá acesso aos dados do paciente, possibilitando a individualização de cada orientação alimentar.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="mt-2">
                  <Card.Body>
                    <FontAwesomeIcon icon={faClock} size="2x" className="mb-2 text-primary" />
                    <Card.Title>Respeita Sua Rotina</Card.Title>
                    <Card.Text>
                      O paciente terá acesso às orientações do nutricionista (assim como: receitas, lista de compras, cardápios) 24 horas por dia.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="p-0 m-0 row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="12 100 1440 180">
          <path fill="#f29f00" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </>
  );
}

export default Home;