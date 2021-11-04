const { Sequelize } = require('sequelize')
const { 
  DB_NAME,
  USER,
  PASSWORD,
  HOST
} = require('../common/environments')
/**
 * Return connection of the database
 */
module.exports = new Sequelize(DB_NAME, USER, PASSWORD, {
  host: HOST,
  logging: false,
  dialect: 'mysql'
})
