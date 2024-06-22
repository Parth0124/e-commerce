const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'e_commerce',
    password: 'Parth0124'
})

module.exports = pool.promise();