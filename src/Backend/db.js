const sql= require('mssql'); 

const config = {
    user:'sa',
    password:'123',
    server:'DESKTOP-6SDSPSO',
    database:'REACT',

    options: {
        encrypt: false, 
        trustServerCertificate: true 
    }
};

const pool=new sql.ConnectionPool(config);
const poolConnect=pool.connect();

module.exports = {sql, pool, poolConnect};