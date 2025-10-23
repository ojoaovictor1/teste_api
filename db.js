const mysql = require('mysql2/promise');

// Configuração do Pool de Conexões com o banco de dados
// As credenciais agora são lidas das variáveis de ambiente
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10, // Limite de conexões simultâneas
    queueLimit: 0
});

// Exportamos o 'pool' para que ele possa ser usado em outros arquivos
module.exports = pool;