import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Cadastro() {

  // VALIDADOR DO CAMPO IDADE
  const [erros, setErros] = useState({
    idade: '',
  });

  const idadeValidador = (value) => {
    // aqui tem o teste que valida se o usuário difitou somente números (é um regex)
    if (!/^\d+$/.test(value)) {
      // aqio ele adiciona na nossa const de erros (valor inicial de "" mas o hook atualiza para a mensagem de erro)
      setErros({ ...erros, idade: 'A idade deve conter apenas números.' });
      console.log("erro: ", erros);
    } else {
      // aqui limpa a constante de erros se a validação agora deu certo
      setErros({ ...erros, idade: '' });
      console.log("sem erro: ", erros);
    }
  };

  // VALIDADOR DO CAMPO DO NUTRICIONISTA - SE A PESSOA É NUTRI, VAI ABRIR O INPUT DO CRN E O PERFIL JÁ MUDA PRA NUTRI
  const [checkNutricionista, setNutricionista] = useState(false);
  const [crn, setCrn] = useState('');
  const [perfil, setPerfil] = useState(''); // O valor inicial do perfil é vazio ("Selecione")
  // se for nutricionista, o crn tem que ser obrgiatório
  const [crnObrigatorio, setCrnObrigatorio] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const checkboxNutricionistaChange = (e) => {
    setNutricionista(e.target.checked);
    if (e.target.checked) {
      setPerfil('nutricionista'); // Define o perfil como "Nutricionista" se o checkbox for marcado
      setCrnObrigatorio(true); // torna o CRN obrigatório
    } else {
      setPerfil(''); // Limpa o perfil se o checkbox for desmarcado
      setCrnObrigatorio(false); // volta a não ser obrigatório o CRN
    }
  };

  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowModal(false);
    // Redireciona para '/login' depois de fechar o modal
    navigate('/login');
  };

  const handleModalShow = () => {
      setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      let endpoint = '';
      let body = {};
  
      const dadosComuns = {
        nome: event.target.nome.value,
        email: event.target.email.value,
        telefone: event.target.telefone.value,
        cpf: event.target.cpf.value,
      };
  
      if (checkNutricionista) {
        endpoint = '/nutricionistas';
        body = {
          ...dadosComuns,
          crn: crn,
          endereco: {
            logradouro: event.target.logradouro.value,
            bairro: event.target.bairro.value,
            cep: event.target.cep.value,
            numero: event.target.numero.value,
            complemento: event.target.complemento.value,
            cidade: event.target.cidade.value,
            uf: event.target.UF.value,
          },
        };
      } else {
        // Se não for nutricionista, vai pro endpoint de pacientes
        endpoint = '/pacientes';
        body = dadosComuns;
      }
      const tokenGeral = Cookies.get('tokenGeral');

      const resposta = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenGeral}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!resposta.ok) {
        throw new Error('Erro ao cadastrar');
      }
  
      handleModalShow();
    } catch (erro) {
      console.error(erro);
    }
  };

  return (

    <div className="container-fluid">
      <div className="row bg-light justify-content-center">
          <div className="p-5 ml-5 col-6 text-center">
              <h2 className="text-primary"><strong>Faça seu cadastro!</strong></h2>
              <h5 className="informacao mt-2 text-secondary text-center">
                  Preencha o formulário abaixo para cadastrar-se.
              </h5>
          </div>
      </div>
      <div className="container">              
        <div className="row mt-5">
            <div className="col-8 offset-2">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                <input type="text" className="form-control" id="nome" placeholder='Digite seu nome completo' required />
                <label htmlFor="nome">Nome Completo</label>
                </div>

                <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder='Digite seu e-mail' required />
                <label htmlFor="email">E-mail</label>
                </div>

                <div className="form-floating mb-3">
                <input type="text" className="form-control" id="telefone" placeholder='Digite seu telefone de contato' required />
                <label htmlFor="telefone">Telefone</label>
                </div>

                <div className="form-floating mb-3">
                <input type="password" className="form-control" id="senha" placeholder='Digite sua senha' required />
                <label htmlFor="senha">Senha</label>
                </div>

                <div className="form-floating mb-3">
                <input type="text" className="form-control" id="cpf"  placeholder='Digite seu CPF' required />
                <label htmlFor="cpf">CPF</label>
                </div>

                <div className="mb-3">
                <input
                  type="checkbox"
                  id="checkNutricionista"
                  onChange={checkboxNutricionistaChange}
                />
                <label htmlFor="checkNutricionista" className="m-2">
                  Sou nutricionista
                </label>
                </div>

                {checkNutricionista && (
                <div>
                  {/* CRN */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="crn"                  
                      placeholder='Informe o número do seu CRN'
                      value={crn}
                      onChange={(e) => setCrn(e.target.value)}
                      required={crnObrigatorio}
                    />
                    <label htmlFor="crn" className="form-label">
                      CRN
                    </label>
                  </div>
                  {/* endereço */}
                  <div>
                    <p className="mt-5">Endereço:</p>

                    <div className="row">
                      <div className="col-8">
                        <div className="form-floating mb-3 mt-3">
                          <input type="text" className="form-control" id="cidade"  placeholder='Digite sua cidade' required />
                          <label htmlFor="cidade">Cidade</label>
                        </div>
                      </div>                    
                      
                      <div className="col-4 form-floating mb-3 mt-3">
                        <select className="form-select" id="UF" required>
                          <option value="">Selecione</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                        <label htmlFor="UF" className="form-label mx-2">
                        UF
                        </label>
                      </div>
                    </div>

                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="logradouro" placeholder='Digite seu logradouro' required />
                      <label htmlFor="logradouro">Logradouro</label>
                    </div>       

                    <div className="row">
                      <div className="form-floating mb-3 col-6">
                        <input type="text" className="form-control" id="cep" placeholder='Digite seu CEP' required />
                        <label htmlFor="cep" className="mx-2">CEP</label>
                      </div> 
                      <div className="form-floating mb-3 col-6">
                        <input type="text" className="form-control" id="numero" placeholder='Digite o número' required />
                        <label htmlFor="numero" className="mx-2">Número</label>
                      </div> 
                    </div>   

                    <div className="row">
                      <div className="form-floating mb-3 col-6">
                        <input type="text" className="form-control" id="bairro" placeholder='Digite seu bairro' required />
                        <label htmlFor="bairro" className="mx-2">Bairro</label>
                      </div> 
                      <div className="form-floating mb-3 col-6">
                        <input type="text" className="form-control" id="complemento" placeholder='Digite o complemento (se houver)' />
                        <label htmlFor="complemento" className="mx-2">Complemento</label>
                      </div> 
                    </div>   
                  </div>
                </div>
                )}

                <div className="mb-3">
                <label htmlFor="perfil" className="form-label">
                  Qual seu perfil ou objetivo?
                </label>
                <select
                  className="form-select"
                  id="perfil"
                  value={perfil}
                  onChange={(e) => setPerfil(e.target.value)}
                  required={true}
                >
                  <option value="">Selecione</option>
                  <option value="atleta">Atleta</option>
                  <option value="alimentacao_saudavel">Alimentação saudável</option>
                  <option value="emagrecimento">Emagrecimento</option>
                  <option value="ganho_massa">Ganho de massa muscular</option>
                  <option value="introducao_alimentar">Introdução alimentar</option>
                  <option value="nutricionista">Nutricionista</option>
                  <option value="restricao_alimentar">Restrição Alimentar</option>
                </select>
                </div>

                <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="idade"
                  placeholder='Informe a sua idade'
                  onChange={(e) => {
                    idadeValidador(e.target.value);
                  }}
                  required={true}
                />
                <label htmlFor="idade" className="form-label">
                  Idade
                </label>
                {erros.idade && <div className="text-danger">{erros.idade}</div>}
                </div>



                <div className="row d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary mt-3 col-sm-6 text-white col-lg-3">
                  Cadastrar
                  </button>
                </div>
              </form>
            </div>
        </div>
      </div>
      <div className="p-0 m-0 row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="12 100 1440 180">
          <path fill="#f29f00" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
        <Modal.Title>Cadastro efetuado com sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você agora está cadastrado(a) em nossa plataforma!
          <br/>Faça seu login!
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary text-white" onClick={handleModalClose}>
            Fechar
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cadastro;