exports.up = function (knex) {
  return knex.schema.createTable("discount_codes", function (table) {
    table.increments("id").primary();
    table.string("code").notNullable();
    table.float("discount").notNullable().unsigned();
    table.date("valid_from");
    table.date("valid_until");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("discount_codes");
};
