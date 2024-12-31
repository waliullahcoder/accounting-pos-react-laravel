const dotenv = require('dotenv');
const app = require('./src/app');
const mysql = require('mysql2/promise');
const dbConfig = require('./src/config').dbConfig;

dotenv.config();
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connected successfully!');
    connection.end();
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});