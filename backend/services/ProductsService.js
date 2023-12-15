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

const getById = async (id) => {
  const product = await database.query(
    `SELECT * FROM products WHERE id = ${id}`
  );
  return product.rows[0];
};

const update = async (id, data) => {
  const product = await database.query(
    `UPDATE products SET product_name = '${data.product_name}', description = '${data.description}', price = '${data.price}' WHERE id = ${id} RETURNING *`
  );
  return product.rows[0];
};

const deleteProduct = async (id) => {
  await database.query(`DELETE FROM order_lines WHERE product_id = ${id}`);
  await database.query(`DELETE FROM products WHERE id = ${id}`);
};

const create = async (data) => {
  const product = await database.query(
    `INSERT INTO products (image_url, product_name, description, price) VALUES ('${data.image_url}', '${data.product_name}', '${data.description}', '${data.price}') RETURNING *`
  );
  return product.rows[0];
};

module.exports = {
  getAll,
  getById,
  update,
  deleteProduct,
  create,
};
