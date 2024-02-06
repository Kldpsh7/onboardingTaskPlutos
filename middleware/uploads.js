const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        fs.mkdir('./vouchers',err=>{
            cb(null,'./vouchers');
        });
    },
    filename:(req,file,cb) => {
        cb(null,'vouchersData.xlsx');
    }
})

const upload = multer({storage:storage});

module.exports = upload;