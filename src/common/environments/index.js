require('dotenv').config()

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT | 3000,
  DB_NAME: process.env.DB_NAME,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
  ES_INDEX_NAME: process.env.ES_INDEX_NAME,
  JWT_KEY: process.env.JWT_KEY,
  HEROKU_MYSQL: process.env.HEROKU_MYSQL,
  CHIP: process.env.CHIP,
  BONSAI_URL: process.env.BONSAI_URL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
}
