const express = require('express');
const bodyParser = require('body-parser')
// const authRoutes = require('./src/AuthRoutes');

const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Разрешенный источник (можно использовать '*' для разрешения от всех)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные методы запросов
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type, Authorization', // Разрешенные заголовки
};

app.use(cors(corsOptions));

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