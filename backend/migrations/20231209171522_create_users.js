// TASK: 1. Define 4 models

exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password_hash").notNullable();
    table.string("role").notNullable();
    table.string("fb_id");
    table.string("google_id");
    // Добавьте другие колонки...
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
