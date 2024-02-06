const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db/db');

const customerRoutes = require('./routes/customer');
const voucherRoutes = require('./routes/voucher');
const buyRoutes = require('./routes/buy');

const Customers = require('./models/customer');
const Vouchers = require('./models/vouchers');
const CustomerVoucher = require('./models/customerVoucher');

const app = express();

app.use(bodyParser.json());

app.use('/customer',customerRoutes);
app.use('/voucher',voucherRoutes);
app.use('/buy',buyRoutes);
app.use('/',(req,res)=>{
    res.status(200).send('Hello! Welcome to HomePage.')
})

Customers.belongsToMany(Vouchers,{through:CustomerVoucher});
Vouchers.belongsToMany(Customers,{through:CustomerVoucher});

sequelize.sync()
.then(()=>{
    app.listen(5500,()=>console.log('listening on 5500'));
})
.catch(err=>console.log(err))