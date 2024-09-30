const  DataTypes  = require('sequelize')
const sequelize = require('../config/db.js')

const users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {
   
    timestamps: false 
})

module.exports =  users 