const express = require('express')
const route = express()
route.use(express.json())
const port = process.env.port || 3000;

const valores = []

route.get('/', (req, res)=>{
    res.send('Inicio dos teste da API')
})
route.get('/testes', (req, res)=>{
    res.json({Lindo_demais: 'João Victor'})
})

route.post('/enviando', (req, res) =>{
    valores.push(req.body)

    res.send("O método post deu certo")
})

route.get('/enviando', (req, res)=>{
    res.json(valores)
})

route.listen(port, ()=>{console.log('Servidor rodando')})