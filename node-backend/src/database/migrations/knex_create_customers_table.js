/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('customers', function (table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.string('first_name').nullable(); // Nullable first name
      table.string('last_name').nullable(); // Nullable last name
      table.string('phone_number').nullable(); // Nullable phone number
      table.string('email').nullable(); // Nullable email
      table.string('zip_code').nullable(); // Nullable zip code
      table.timestamps(true, true); // Created and updated timestamps
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('customers'); // Drop the customers table
  };
  