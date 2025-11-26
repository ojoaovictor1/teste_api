const { DataTypes } = require('sequelize');
const db = require('../db/db');

const Desenvolvedores = db.define('Desenvolvedores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.STRING,
        allowNull: false
    }

},  {
    timestamps: false,
    tableName: 'desenvolvedores'
});
//Desenvolvedores.sync({ alter: true });
module.exports = Desenvolvedores;