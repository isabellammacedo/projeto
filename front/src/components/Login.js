import { useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [permanecerConectado, setPermanecerConectado] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Envia a solicitação de login para o endpoint /login
      const resposta = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: email,
          senha: senha,
        }),
      });

      if (!resposta.ok) {
        throw new Error('Erro no Login');
      }

      const dados = await resposta.json();

      //pega o token no retorno
      const token = dados.token;

      // Salva o token nos cookies
      Cookies.set('token', token, { expires: permanecerConectado ? 365 : 1 });

      console.log('Login efetuado!');
      console.log('Token:', token);
    } catch (erro) {
      console.error('Erro login:', erro.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row bg-light justify-content-center">
        <div className="p-5 ml-5 col-6 text-center">
          <h2 className="text-primary"><strong>Login</strong></h2>
          <h5 className="informacao mt-2 text-secondary text-center">
            Preencha os campos abaixo para entrar na plataforma.
          </h5>
        </div>
      </div>
      <div className="container">              
        <div className="row mt-5">
          <form onSubmit={handleSubmit}>

              <div className="form-floating mb-3 col-5 mx-auto">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email">E-mail</label>
              </div>

              <div className="form-floating mb-3 col-5 mx-auto">
                <input
                  type="password"
                  className="form-control"
                  id="senha"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <label htmlFor="senha">Senha</label>
              </div>

              <div className="form-check mb-3 col-5 mx-auto">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="permanecerConectado"
                  checked={permanecerConectado}
                  onChange={() => setPermanecerConectado(!permanecerConectado)}
                />
                <label className="form-check-label" htmlFor="permanecerConectado">
                  Permanecer conectado
                </label>
              </div>

              <div className="mb-3 col-5 mx-auto d-flex justify-content-end">
                <button type="submit" className="btn btn-primary mt-3 col-sm-6 text-white col-lg-3">
                  Entrar
                </button>
              </div>

              <p className="informacao mt-5 text-center">
                Ainda não possui cadastro? <Link to="/cadastro">Clique aqui para se cadastrar</Link>
              </p>
            </form>
        </div>
      </div>
      <div className="p-0 m-0 row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 289">
          <path fill="#f29f00" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Login;