const express = require('express')
const router = express.Router()
const database = require('../database')

router.get('/', async (req, res) => {
  const products = await database.query('select * from products order by ID asc')

  res.status(200).json(products.rows);
})

module.exports = router