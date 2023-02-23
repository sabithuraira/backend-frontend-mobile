const Sequelize = require('sequelize')

const dbase = new Sequelize('teees', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = dbase;