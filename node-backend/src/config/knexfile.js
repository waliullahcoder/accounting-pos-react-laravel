const { dbConfig } = require('../config/index'); // Adjust the path if needed

module.exports = {
  client: 'mysql2', // Use 'pg' for PostgreSQL, 'sqlite3' for SQLite, etc.
  connection: dbConfig,
  migrations: {
    directory: '../database/migrations', // Adjust path if needed
  },
};
