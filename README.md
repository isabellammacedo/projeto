# Projeto NutriFit

Este é um projeto tem como objetivo conectar pacientes a profissionais de nutricao. Ele permite agendar consultas, visualizar receitas e oferece login exclusivo para os profissionais acessarem a agenda. O design prioriza eficiência e usabilidade, refletindo nosso compromisso com a qualidade acadêmica.

## Pré-requisitos

- Docker Desktop
- Node.js
- NPM
- VS Code

## Como executar o projeto

1. Baixe e instale o Docker Desktop se ainda não o tiver instalado.
2. Clone o repositório do projeto usando o comando git clone https://github.com/isabellammacedo/projeto.
3. Abra o projeto no VS Code.
4. Abra o terminal no VS Code.
5. No terminal, execute o comando docker-compose up.
6. Aguarde até que os contêineres estejam em execução. Você saberá que estão prontos quando vir a seguinte mensagem no terminal: [Server] /usr/sbin/mysqld: ready for connections. (Esta etapa pode demorar um pouco).
7. Abra outro terminal na mesma pasta, navegue até o diretório "/front", e execute os comandos npm install e npm start. Aguarde até ver a mensagem que indica que a compilação foi bem-sucedida.
8. A aplicação agora deve estar rodando nas seguintes portas: 3000 (front-end), 8080 (back-end) e 3306 (banco de dados).

## Acessando a Aplicação

- Swagger: http://localhost:8080/swagger-ui/index.html
- Front-end: http://localhost:3000/

## Video mostrando Aplicação em funcionamento 
https://youtu.be/qHwYGVLHEnw



Espero que isso ajude! Se você tiver mais perguntas, sinta-se à vontade para perguntar.
