// // server.js (Express сервер)



const express = require('express');
const authRoutes = require('./src/AuthRoutes');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use('/', authRoutes);



// // Подключение к базе данных PostgreSQL
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'pizzeria',
//   password: 'postgres',
//   port: 5434,
// });

// app.get('/seed', async (req, res) => {
//   try {
//     // Здесь можно выполнить SQL-запросы для заполнения таблиц данными
//     const client = await pool.connect();

//     // Пример использования SQL-запроса для вставки данных в таблицу пользователей
//     await client.query(`
//       INSERT INTO users (username, email, password_hash)
//       VALUES 
//         ('misha', 'misha@gmail.com', 'misha123'),
//         ('vasya', 'vasya@gmail.com', 'vasya123'),
//         ('nikita', 'nikita@gmail.com', 'nikita123'),
//         ('dima', 'dima@gmail.com', 'dima1234'),
//         ('andrew', 'andrew@gmail.com', 'andrew123'),
//         ('gennady', 'gennady@gmail.com', 'gennady123'),
//         ('vasilisa', 'vasilisa@gmail.com', 'vasilisa123');
//     `);

//     await client.query(`
//       INSERT INTO products (product_name, price, description, image_url)
//       VALUES 
//         ('Карбонара', 11.99, 'Бекон, сыры чеддер и пармезан, моцарелла, томаты, соус альфредо, лук, чеснок, итальянские травы', 'https://dodopizza-a.akamaihd.net/static/Img/Products/0a496a3d8b87415dbc3d3647ff8f3db8_292x292.webp'),
//         ('Пепперони', 12.99, 'Пикантная пепперони, мно-о-ого моцареллы и томатный соус. Самая популярная пицца', 'https://dodopizza-a.akamaihd.net/static/Img/Products/70834e6311c0483493bf2279dbc1718d_292x292.webp'),
//         ('Итальянский цыпленок', 13.99, 'Цыпленок, итальянские травы, моцарелла, соус альфредо, красный лук, томаты', 'https://dodopizza-a.akamaihd.net/static/Img/Products/778cd3360b124344b86d3031bc02386e_292x292.webp'),
//         ('Ветчина и грибы', 14.99, 'Ветчина, много моцареллы, шампиньоны, томатный соус', 'https://dodopizza-a.akamaihd.net/static/Img/Products/170dc9490a9f47928d616c9937b55735_292x292.webp'),
//         ('Деревенская', 15.99, 'Цыпленок, картофель из печи, маринованные огурчики, красный лук, сухой чеснок, фирменный томатный соус, моцарелла, соус ранч', 'https://dodopizza-a.akamaihd.net/static/Img/Products/4ce729f1b8db4b60abf8827c7efb28c6_292x292.webp'),
//         ('Домашняя', 16.99, 'Пепперони, ветчина, маринованные огурчики, томаты, моцарелла, томатный соус', 'https://dodopizza-a.akamaihd.net/static/Img/Products/ee610848581545c298a429c05802f56d_292x292.webp'),
//         ('Ветчина и сыр', 17.99, 'Ветчина, моцарелла и соус альфредо — просто и со вкусом', 'https://dodopizza-a.akamaihd.net/static/Img/Products/bdc5caa51bd64af1b8712fc03aeaf386_292x292.webp'),
//         ('Мясная', 18.99, 'Цыпленок, ветчина, пикантная пепперони, острая чоризо, моцарелла, томатный соус', 'https://dodopizza-a.akamaihd.net/static/Img/Products/4fa4de77d8a34912830cfdbedfaff698_292x292.webp'),
//         ('Итальянская', 19.99, 'Томатный соус, пикантная пепперони, маслины, шампиньоны, моцарелла, итальянские травы', 'https://dodopizza-a.akamaihd.net/static/Img/Products/143590256f2c4010b8028219e2fd93dc_292x292.webp'),
//         ('Сырная', 20.99, 'Увеличенная порция моцареллы, сыры чеддер и пармезан, соус альфредо', 'https://dodopizza-a.akamaihd.net/static/Img/Products/c04ab5bb5c824108ac857043bc8f8751_292x292.webp');
//     `);

//     // Заполнение таблицы заказов
//     await client.query(`
//       INSERT INTO orders (user_id, total_amount, status)
//       VALUES 
//         (1, 25.98, 'В обработке'),
//         (2, 30.00, 'Выполнен');
//     `);

//     // Заполнение таблицы скидочных кодов
//     await client.query(`
//       INSERT INTO discount_codes (code, discount, valid_from, valid_until)
//       VALUES 
//         ('CODE123', 10.00, '2023-01-01', '2023-12-31'),
//         ('CODE228', 99.00, '2023-01-01', '2023-12-31'),
//         ('CODE456', 15.00, '2023-06-01', '2023-12-01');
//     `);

//     // Можно добавить SQL-запросы для заполнения других таблиц здесь

//     client.release();
//     res.send('Данные успешно добавлены в базу данных');
//   } catch (err) {
//     console.error('Ошибка при заполнении данными:', err);
//     res.status(500).send('Ошибка при заполнении данными');
//   }
// });



app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});



// const express = require('express');
// const authRoutes = require('./src/AuthRoutes');
// const authRoutesGoogle = require('./src/AuthRoutesGoogle');
// const bodyParser = require('body-parser')

// const app = express();

// app.use('/', authRoutes);
// app.use('/', authRoutesGoogle);

// // Start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// const port = 3001

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

// app.get('/', (request, response) => {
//     response.json({ info: 'Node.js, Express, and Postgres API' })
// })

// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
//   })

// const express = require('express');
// const authRoutes = require('./authRoutes');

// const app = express();

// app.use('/', authRoutes);

// // Start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// const port = 3001

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })

// app.listen(port, () => {
//   console.log(`App running on port ${port}.`)
// })