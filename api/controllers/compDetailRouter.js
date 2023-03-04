const router = require('express').Router();
const companyDetails = require('../services/companyDetails');
const chech_auth = require('../services/middleware/check-auth');
// const companyDetails = require('../models/companyDetails');

router.post('/companydetails', chech_auth, companyDetails.comp_register)
router.put('/:id', chech_auth, companyDetails.updatedata)
router.delete('/:id', chech_auth, companyDetails.deletedata)
router.get('/', chech_auth, companyDetails.getAllCompnaysDetails)
router.get('/:id', chech_auth,companyDetails.getOneCompnayById)


module.exports = router;