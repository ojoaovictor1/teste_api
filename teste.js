require('dotenv').config(); 

const express = require('express')
const pool = require('./db');
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
route.get('/acomodacoes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM acomodacoes');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Ocorreu um erro nesta solicitação.' });
    }
});

route.post('/usuarios', async (req, res)=>{
    try{
        const [rows] = await pool.query('INSERT INTO usuarios (nome, email, telefone, idade) VALUES (?, ?, ?, ?)', [req.body.nome, req.body.email, req.body.telefone,req.body.idade]);
        res.json({message: 'Usuário inserido com sucesso!', id: rows.insertId});
    } catch (error) {
        console.error('Erro ao inserir usuário no banco de dados:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao inserir o usuário.' });
    }
})

route.get('/usuarios', async (req, res)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows)
    } catch (error) {
        console.error('Erro ao buscar usuários no banco de dados:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao buscar os usuários.' });
    }
})

route.post('/enviando', (req, res) =>{
    valores.push(req.body)

    res.send("O método post deu certo")
})

route.get('/enviando', (req, res)=>{
    res.json(valores)
})

route.listen(port, ()=>{console.log('Servidor rodando')})