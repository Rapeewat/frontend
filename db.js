const sql = require('mssql');

const config = {
  user: 'sa',
  password: '090145',
  server: 'DESKTOP-1MKS0PA', // เช่น 'localhost' หรือชื่อ server จริง
  database: 'promsuk',
  options: {
    encrypt: true, // ใช้การเข้ารหัสถ้าจำเป็น
    trustServerCertificate: true, // ถ้าเป็น local server และไม่ต้องใช้ certificate
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to the database!');
    return pool;
  })
  .catch(err => console.error('Database Connection Failed!', err));

module.exports = {
  sql, poolPromise
};