require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    secret: process.env.SECRET,
    dialect: 'mysql',
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,

    dialect: 'mysql',
  },

  secret: process.env.SECRET,
  port: process.env.PORT | 3000,
  url: process.env.URL + ':' + this.port,
};
