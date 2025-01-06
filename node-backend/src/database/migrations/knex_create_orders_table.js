/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.string('order_number').nullable(); // Nullable order number
      table.bigInteger('customer_id').unsigned().nullable(); // Unsigned big integer for customer ID
      table.float('price', 8, 2).nullable(); // Nullable price with two decimal places
      table.integer('quantity').nullable(); // Nullable quantity
      table.timestamps(true, true); // Created and updated timestamps
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('orders'); // Drop the orders table
  };
  