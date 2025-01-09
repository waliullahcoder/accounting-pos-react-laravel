/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('products', function (table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.string('name'); // Product name
      table.bigInteger('category_id').unsigned(); // Unsigned big integer for the category ID
      table.integer('quantity'); // Stock quantity
      table.float('sale_price', 8, 2); // Price with two decimal places
      table.float('purchase_price', 8, 2); // Price with two decimal places
      table.string('image').nullable(); // Nullable image field
      table.timestamps(true, true); // Created and updated timestamps
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('products'); // Drop the products table
  };
  