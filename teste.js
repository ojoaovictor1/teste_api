require('dotenv').config(); 
require('./src/models/Desenvolvedores');
require('./src/models/Usuario');
const Desenvolvedores = require('./src/controller/Desenvolvedores');
const Usuario = require('./src/controller/Usuario');

const express = require('express')
const pool = require('./src/db/db');
const route = express();
route.use(express.json());
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
    // try {
    //     const { id, nome } = req.query;
    //     let query = 'SELECT * FROM usuarios';
    //     const params = [];

    //     if (id || nome) {
    //         query += ' WHERE ';
    //         const construcao_query = [];
    //         if (id) {
    //             construcao_query.push('id = ?');
    //             params.push(id);
    //         }
    //         if (nome) {
    //             // buscas parciais no nomeeeee
    //             construcao_query.push('nome LIKE ?');
    //             params.push(`%${nome}%`);
    //         }
    //         query += construcao_query.join(' AND ');
    //     }

    //     const [rows] = await pool.query(query, params);
    //     res.json(rows);
    // } catch (error) {
    //     console.error('Erro ao buscar usuários:', error);
    //     res.status(500).json({ error: 'Ocorreu um erro ao buscar os usuários.' });
    // }
    try {
        const { id, nome} = req.query;
        console.log("Recebi isso: ", {id, nome});
        const where = {};

        if(id){
            where.id = id
        };

        if(nome){
            where.nome = {[Op.like]: `%${nome}%`};
        }

        const usuarios = await findAll({where});
        res.json(usuarios);

    } catch (error) {
        console.log('Erro ao buscar usuários:', error);
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

route.post('/desenvolvedores', Desenvolvedores.Cadastrar)
route.get('/desenvolvedores', Desenvolvedores.Listar)

route.listen(port, ()=>{console.log('Servidor rodando')})