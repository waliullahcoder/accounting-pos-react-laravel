/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('personal_access_tokens', function (table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.integer('tokenable_id').unsigned(); // Foreign key for the tokenable entity's ID
      table.string('tokenable_type'); // Type of the tokenable entity (e.g., 'User', 'Admin')
      table.string('name'); // Name of the token
      table.string('token', 64).unique(); // Unique token string
      table.text('abilities').nullable(); // Abilities (optional field)
      table.timestamp('last_used_at').nullable(); // Timestamp when the token was last used
      table.timestamp('expires_at').nullable(); // Timestamp when the token expires
      table.timestamps(true, true); // Created and updated timestamps
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('personal_access_tokens'); // Drop the personal_access_tokens table
  };
  