const database = require("../database");

const getAllSortedBy = async (sortBy = "id", sortDirection = "ASC") => {
  const orders = await database.query(
    `SELECT orders.id as id, json_agg(DISTINCT users) as user,  json_agg(products) as products, orders.created_at as created_at FROM orders
     INNER JOIN order_lines ON orders.id = order_lines.order_id
     INNER JOIN products ON products.id = order_lines.product_id
     INNER JOIN users ON users.id = orders.user_id
     GROUP BY orders.id
     ORDER BY ${sortBy} ${sortDirection}`
  );

  return orders.rows;
};

module.exports = {
  getAllSortedBy,
};
