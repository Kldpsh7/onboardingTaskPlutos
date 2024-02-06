const express = require('express');
const voucherController = require('../controllers/vouchers');
const upload = require('../middleware/uploads');
const router = express.Router();

router.get('/',voucherController.getVouchersByType,voucherController.getVouchersById,voucherController.getAllVouchers,);
router.post('/', upload.single('file'), voucherController.createVouchers);
router.put('/',voucherController.updateVoucher);
router.delete('/',voucherController.deleteVoucher);

module.exports = router;