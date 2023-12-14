exports.up = function (knex) {
  return knex.schema.createTable("order_lines", function (table) {
    table.increments("id").primary();
    table.integer("product_id").notNullable();
    table.integer("order_id").notNullable();
    table.foreign("product_id").references("id").inTable("products");
    table.foreign("order_id").references("id").inTable("orders");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("order_lines");
};
