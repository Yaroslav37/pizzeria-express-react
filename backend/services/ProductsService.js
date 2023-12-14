const database = require("../database");

const getAllSortedById = async () => {
  const products = await database.query(
    "select * from products order by ID asc"
  );
  return products.rows;
};

module.exports = {
  getAllSortedById,
};
