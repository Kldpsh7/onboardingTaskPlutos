const Vouchers = require('../models/vouchers');
const xlsx = require('xlsx');
const path = require('path');

module.exports.getAllVouchers = async (req,res)=>{
    const vouchers = await Vouchers.findAll();
    res.status(200).json(vouchers);
}

module.exports.getVouchersById = async (req,res,next)=>{
    if(!req.query.id){
        next()
        return
    }
    const voucher = await Vouchers.findOne({where:{id:req.query.id}});
    if(voucher===null){
        res.status(404).json({message:'Voucher not found for this id'})
    }else{
        res.status(200).json(voucher);
    }
}

module.exports.getVouchersByType = async (req,res,next)=>{
    if(!req.query.type){
        next()
        return
    }
    const vouchers = await Vouchers.findAll({where:{type:req.query.type}});
    if(vouchers.length===0){
        res.status(404).json({message:'No vouchers in this category'});
    }else{
        res.status(200).json(vouchers);
    }
}

module.exports.createVouchers = async (req,res) => {
    const workbook = xlsx.readFile(path.join(__dirname,'../','vouchers','vouchersData.xlsx'));
    let workbook_sheet = workbook.SheetNames;               
    let workbook_response = xlsx.utils.sheet_to_json(        
      workbook.Sheets[workbook_sheet[0]]
    );
    try{
        for(const voucher of workbook_response){
            const existingVoucher = await Vouchers.findOne({where:{code:voucher.code}});
            if(existingVoucher){
                existingVoucher.title=voucher.title;
                existingVoucher.offerPrice=voucher.offerPrice;
                existingVoucher.description=voucher.description;
                existingVoucher.mrp=voucher.mrp;
                existingVoucher.type=voucher.type;
                await existingVoucher.save();
            }else{
                await Vouchers.create({
                    title:voucher.title,
                    offerPrice:voucher.offerPrice,
                    description:voucher.description,
                    mrp:voucher.mrp,
                    code:voucher.code,
                    type:voucher.type
                })
            }
        }
        res.status(201).json({message:'Vouchers added / updated'});
        // const addedVouchers = await Vouchers.bulkCreate(workbook_response);
        // res.status(201).json({message:'Vouchers added in bulk',vouchers:addedVouchers});
    }catch(err){
        console.log(err);
    }
}

module.exports.updateVoucher = async(req,res) => {
    const existingVoucher = await Vouchers.findByPk(req.query.id);
    if(existingVoucher===null){
        res.status(404).json({message:'Incorrect voucher id, voucher not found'});
    }else{
        try{
            existingVoucher.title=req.body.title;
            existingVoucher.offerPrice=req.body.offerPrice;
            existingVoucher.description=req.body.description;
            existingVoucher.mrp=req.body.mrp;
            existingVoucher.code=req.body.code;
            const updatedVoucher = await existingVoucher.save();
            res.status(201).json({message:'Voucher updated successfully',voucher:existingVoucher});
        }catch(err){console.log(err)}
    }
}

module.exports.deleteVoucher = async(req,res) => {
    const existingVoucher = await Vouchers.findByPk(req.query.id);
    if(existingVoucher===null){
        res.status(404).json({message:'Incorrect voucher id, voucher not found'});
    }else{
        try{
            await existingVoucher.destroy();
            res.status(200).json({message:'Voucher deleted successfully'});
        }catch(err){console.log(err)}
    }
}