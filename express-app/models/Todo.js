const dbase = require('../config/Database.js');
const { Sequelize, DataTypes} = require('sequelize');

const Todo = dbase.define('todo',
    {
        //daftar attribute
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: { type: DataTypes.STRING },
        createdAt: {
            type: Sequelize.DATE, field: 'created_at'
        },
        updatedAt: {
            type: Sequelize.DATE, field: 'updated_at'
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        underscored: true
    }
);

module.exports = Todo;
(async() => {
    await dbase.sync()
})();