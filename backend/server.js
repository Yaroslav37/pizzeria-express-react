const express = require('express');
const bodyParser = require('body-parser')
// const authRoutes = require('./src/AuthRoutes');
const { Pool } = require('pg');

const app = express();
const port = 3001;
const productsRouter = require('./api/products')

// app.use('/', authRoutes);

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/products', productsRouter)

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});