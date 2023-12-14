const database = require("../database");

const getAll = async (search = "", sortDirection = "ASC", sortField = "id") => {
  if (search) {
    const products = await database.query(
      `SELECT * FROM products WHERE description ILIKE '%${search}%' or product_name ILIKE '%${search}%' ORDER BY ${sortField} ${sortDirection}`
    );
    return products.rows;
  } else {
    const products = await database.query(
      `SELECT * FROM products ORDER BY ${sortField} ${sortDirection}`
    );
    return products.rows;
  }
};

module.exports = {
  getAll,
};
