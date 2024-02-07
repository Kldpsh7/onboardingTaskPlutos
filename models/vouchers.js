const Sequelize = require('sequelize');
const sequelize = require('../utils/db');

const Vouchers = sequelize.define('voucher',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    offerPrice:{
        type:Sequelize.STRING,
        allowNull:false
    },
    mrp:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    code:{
        type:Sequelize.STRING,
        allowNull:false
    },
    type:{
        type:Sequelize.STRING,
        allowNull:false
    },
})

module.exports = Vouchers;