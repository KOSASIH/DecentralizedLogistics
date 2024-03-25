const mysql = require('mysql2');

// Create a pool of database connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'decentralized_logistics',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to execute a SQL query
async function executeQuery(query, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      connection.query(query, params, (err, rows, fields) => {
        if (err) {
          return reject(err);
        }

        connection.release();

        return resolve(rows);
      });
    });
  });
}

// Example usage
const query = 'SELECT * FROM shipments WHERE id = ?';
const params = [1];

executeQuery(query, params)
  .then((rows) => {
    console.log(rows);
  })
  .catch((err) => {
    console.error(err);
  });
