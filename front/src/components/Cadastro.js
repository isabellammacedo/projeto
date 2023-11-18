import { useState } from 'react';

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

  return (
  <div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>Cadastre-se</h2>
            <form>
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
                  required="true"
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
                  required="true"
                />
                <label htmlFor="idade" className="form-label">
                  Idade
                </label>
                {erros.idade && <div className="text-danger">{erros.idade}</div>}
              </div>

              <div className="row">
                  <p>Endereço:</p>
                  <div className="col">
                    <label htmlFor="UF" className="form-label">
                    Estado (UF)
                    </label>
                    <select className="form-select" id="UF">
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
                  </div>

                  {/* <div className="col">
                  <div className="form-floating mb-3 mt-3">
                  <input type="text" className="form-control" id="cidade"  placeholder='Digite sua cidade' required />
                    <label htmlFor="cidade">Cidade</label>
                  </div>
                  </div> */}
              </div>

              <button type="submit" className="btn btn-primary mt-3 text-white">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;