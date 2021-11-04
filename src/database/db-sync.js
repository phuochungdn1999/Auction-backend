const sequelize = require('./connection')
/**
 * @Usage 
 * Synchronize current models with relationship to db
 * 
 * Just call this once to create relationship
 */
module.exports = function() {
  sequelize.sync({ force: true })
    .then(() => console.log('Sync db successfully'))
    .catch(err => console.log(err))
}
