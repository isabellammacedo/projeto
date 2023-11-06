<?php
// Conexão com o banco de dados (substitua com suas próprias credenciais)
$host = "localhost";
$db_user = "seu_usuario";
$db_password = "sua_senha";
$database = "seu_banco_de_dados";

$conn = new mysqli($host, $db_user, $db_password, $database);

// Verifique se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Recupere os dados do formulário
$username = $_POST['username'];
$password = $_POST['password'];

// Consulta SQL para verificar as credenciais do usuário
$sql = "SELECT * FROM usuarios WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Usuário autenticado com sucesso
    // Redirecionar para a homepage
    header("Location: homepage.html");
    exit(); // Certifique-se de sair após o redirecionamento
} else {
    // Credenciais inválidas
    echo "Login falhou. Verifique seu nome de usuário e senha.";
}

// Feche a conexão com o banco de dados
$conn->close();
?>
