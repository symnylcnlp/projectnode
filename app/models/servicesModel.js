const  DataTypes  = require('sequelize')
const sequelize = require('../config/db.js')

const users = sequelize.define('services', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    description2: DataTypes.TEXT,
    images: DataTypes.TEXT
}, {
   
    timestamps: false 
})

module.exports =  users 