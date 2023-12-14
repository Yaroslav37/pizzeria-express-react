// TASK 5: Database seeding
exports.seed = async function (knex) {
  function products_seed() {
    return knex("products")
      .del()
      .then(function () {
        // Вставляем новые данные
        return knex("products").insert([
          {
            product_name: "Карбонара",
            price: 11.99,
            description:
              "Бекон, сыры чеддер и пармезан, моцарелла, томаты, соус альфредо, лук, чеснок, итальянские травы",
            image_url:
              "https://dodopizza-a.akamaihd.net/static/Img/Products/0a496a3d8b87415dbc3d3647ff8f3db8_292x292.webp",
          },
          {
            product_name: "Пепперони",
            price: 12.99,
            description:
              "Пикантная пепперони, мно-о-ого моцареллы и томатный соус. Самая популярная пицца",
            image_url:
              "https://dodopizza-a.akamaihd.net/static/Img/Products/70834e6311c0483493bf2279dbc1718d_292x292.webp",
          },
          {
            product_name: "Итальянский цыпленок",
            price: 13.99,
            description:
              "Цыпленок, итальянские травы, моцарелла, соус альфредо, красный лук, томаты",
            image_url:
              "https://dodopizza-a.akamaihd.net/static/Img/Products/778cd3360b124344b86d3031bc02386e_292x292.webp",
          },
          {
            product_name: "Ветчина и грибы",
            price: 14.99,
            description: "Ветчина, много моцареллы, шампиньоны, томатный соус",
            image_url:
              "https://dodopizza-a.akamaihd.net/static/Img/Products/170dc9490a9f47928d616c9937b55735_292x292.webp",
          },
          {
            product_name: "Деревенская",
            price: 15.99,
            description:
              "Цыпленок, картофель из печи, маринованные огурчики, красный лук, сухой чеснок, фирменный томатный соус, моцарелла, соус ранч",
            image_url:
              "https://dodopizza-a.akamaihd.net/static/Img/Products/4ce729f1b8db4b60abf8827c7efb28c6_292x292.webp",
          },
          {
            product_name: "Домашняя",
            price: 16.99,
            description:
              "Пепперони, ветчина, маринованные огурчики, томаты, моцарелла, томатный соус",
            image_url:
              "https://dodopizza-a.akamaihd.net/static/Img/Products/ee610848581545c298a429c05802f56d_292x292.webp",
          },
          {
            product_name: "Ветчина и сыр",
            price: 17.99,
            description:
              "Ветчина, моцарелла и соус альфредо — просто и со вкусом",
            image_url:
              "https://dodopizza-a.akamaihd.net/static/Img/Products/bdc5caa51bd64af1b8712fc03aeaf386_292x292.webp",
          },
          {
            product_name: "Мясная",
            price: 18.99,
            description:
              "Цыпленок, ветчина, пикантная пепперони, острая чоризо, моцарелла, томатный соус",
            image_url:
              "https://dodopizza-a.akamaihd.net/static/Img/Products/4fa4de77d8a34912830cfdbedfaff698_292x292.webp",
          },
          {
            product_name: "Итальянская",
            price: 19.99,
            description:
              "Томатный соус, пикантная пепперони, маслины, шампиньоны, моцарелла, итальянские травы",
            image_url:
              "https://dodopizza-a.akamaihd.net/static/Img/Products/143590256f2c4010b8028219e2fd93dc_292x292.webp",
          },
          {
            product_name: "Сырная",
            price: 20.99,
            description:
              "Увеличенная порция моцареллы, сыры чеддер и пармезан, соус альфредо",
            image_url:
              "https://dodopizza-a.akamaihd.net/static/Img/Products/c04ab5bb5c824108ac857043bc8f8751_292x292.webp",
          },
        ]);
      });
  }

  function users_seed() {
    // Удаляем все записи из таблицы перед добавлением новых данных
    return knex("users")
      .del()
      .then(function () {
        // Вставляем новые данные
        return knex("users").insert([
          {
            name: "yaroslav",
            email: "minenkovyaroslav@mail.ru",
            password_hash: "password",
            role: "admin",
          },
          {
            name: "vasya",
            email: "vasya@gmail.com",
            password_hash: "password",
            role: "customer",
          },
          {
            name: "nikita",
            email: "nikita@gmail.com",
            password_hash: "password",
            role: "customer",
          },
          {
            name: "dima",
            email: "dima@gmail.com",
            password_hash: "password",
            role: "customer",
          },
          {
            name: "andrew",
            email: "andrew@gmail.com",
            password_hash: "password",
            role: "customer",
          },
          {
            name: "gennady",
            email: "gennady@gmail.com",
            password_hash: "password",
            role: "customer",
          },
          {
            name: "vasilisa",
            email: "vasilisa@gmail.com",
            password_hash: "password",
            role: "customer",
          },
        ]);
      });
  }
  await knex("order_lines").del();
  await knex("orders").del();
  return users_seed().then(products_seed);
};
