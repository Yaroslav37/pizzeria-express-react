exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('users');
        table.integer('discount_id');
        table.foreign('discount_id').references('id').inTable('discount_codes');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('orders');
};
