module.exports = {
  dbConfig: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'accounting_pos_node_react',
  },
  jwtSecret: process.env.JWT_SECRET || 'bsCgierhYcSgG6uLyngwqAYkaGuNKgkhl8xNtyNzF2jbtSyR2asV1ppHaCAENlFa',
  superadminmail: 'superadmin@example.com',
};
