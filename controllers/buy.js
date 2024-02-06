const Customers = require('../models/customer');
const Vouchers = require('../models/vouchers');

module.exports.buy = async (req,res) => {
    const existingVouchers = await req.user.getVouchers();
    const voucher = await Vouchers.findByPk(req.query.voucherId);
    const voucherIndex = existingVouchers.findIndex(v=>v.id===voucher.id)
    if(voucherIndex>=0){
        res.status(403).json({message:'This voucher is already availed!'})
    }else{
        await req.user.addVoucher(voucher);
        res.status(200).json({message:'Success'})
    }
}