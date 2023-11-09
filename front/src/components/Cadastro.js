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
  const [isNutricionista, setNutricionista] = useState(false);
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
        <h2>Cadastre-se</h2>
        <form>
        <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input type="text" className="form-control" id="nome" required="true"/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" required="true"/>
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">
              Senha
            </label>
            <input type="password" className="form-control" id="senha" required="true"/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpf" className="form-label">
              CPF
            </label>
            <input type="text" className="form-control" id="cpf" required="true"/>
          </div>
          <div className="mb-3">
            <label htmlFor="isNutricionista" className="form-label">
              Sou nutricionista
            </label>
            <input
              type="checkbox"
              id="isNutricionista"
              onChange={checkboxNutricionistaChange}
            />
          </div>
          {isNutricionista && (
            <div className="mb-3">
              <label htmlFor="crn" className="form-label">
                CRN
              </label>
              <input
                type="text"
                className="form-control"
                id="crn"
                value={crn}
                onChange={(e) => setCrn(e.target.value)}
                required={crnObrigatorio}
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="perfil" className="form-label">
              Perfil
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
          <div className="mb-3">
            <label htmlFor="idade" className="form-label">
              Idade
            </label>
            <input
              type="text"
              className="form-control"
              id="idade"
              onChange={(e) => {
                idadeValidador(e.target.value);
              }}
              required="true"
            />
            {erros.idade && <div className="text-danger">{erros.idade}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;