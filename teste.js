require('dotenv').config(); // Carrega as variáveis do .env para process.env

const express = require('express')
const pool = require('./db'); // Importa o nosso pool de conexões
const route = express()
route.use(express.json())
const port = process.env.port || 3000;

const valores = []

// Rotas existentes
route.get('/', (req, res)=>{
    res.send('Inicio dos teste da API')
})
route.get('/testes', (req, res)=>{
    res.json({Lindo_demais: 'João Victor'})
})

// Nova rota para testar a conexão com o banco
route.get('/usuarios', async (req, res) => {
    try {
        // Exemplo de query para buscar todos os usuários de uma tabela "usuarios"
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
    }
});

route.post('/enviando', (req, res) =>{
    valores.push(req.body)

    res.send("O método post deu certo")
})

route.get('/enviando', (req, res)=>{
    res.json(valores)
})

route.listen(port, ()=>{console.log('Servidor rodando')})