/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('password_reset_tokens', function (table) {
      table.string('email').primary(); // Primary key is 'email'
      table.string('token'); // Token
      table.timestamp('created_at').nullable(); // Timestamp
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('password_reset_tokens'); // Drop table if exists
  };
  