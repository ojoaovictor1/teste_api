const Desenvolvedores = require('../models/Desenvolvedores');

exports.Cadastrar = async (req, res) => {
    const {nome, idade} = req.body;
    try {
        const novoDesenvolvedor = await Desenvolvedores.create({nome, idade});
        res.status(201).json(novoDesenvolvedor);
        } catch (error) {
        console.error('Erro ao cadastrar desenvolvedor:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o desenvolvedor.' });
        }
}
exports.Listar = async (req, res) => {
    try {
        const {nome, idade} = req.query;
        let where = {};

        if(nome){
            where.nome = nome;
        }

        if(idade){
            where.idade = idade;
        }

        const desenvolvedores = await Desenvolvedores.findAll({where});
        res.json(desenvolvedores);

    } catch (error) {
        console.error('Erro ao listar desenvolvedores:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao listar os desenvolvedores.' });
    }
}