const Sequelize = require('sequelize');
const sequelize = require('../db/db');

const CustomerVoucher = sequelize.define('customerVoucher',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    }
})

module.exports = CustomerVoucher;