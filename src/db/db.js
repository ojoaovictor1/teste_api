// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     waitForConnections: true,
//     //connectionLimit: 10,
//     queueLimit: 0
// });
// module.exports = pool;

require("dotenv").config();
const {Sequelize} = require("sequelize");

const db = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        port: process.env.DB_PORT
    }
);

db.authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso utilizando Sequelize")
    })
    .catch((err)=>{
        console.log(err);
        console.log("Conexão não realizada")
    })
    module.exports = db;