const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pizzeria',
  password: 'postgres',
  port: 5434,
})

module.exports = pool