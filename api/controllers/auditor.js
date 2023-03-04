const router = require('express').Router();
const auditorDetails = require('../services/auditor');
const chech_auth = require('../services/middleware/check-auth');
// const companyDetails = require('../models/companyDetails');

router.post('/auditorDetails', chech_auth, auditorDetails.addAuditor)
router.put('/:id', chech_auth, auditorDetails.updateAuditor)
router.delete('/:id', chech_auth, auditorDetails.deleteAuditor)
router.get('/', chech_auth, auditorDetails.getAuditor)
router.get('/:id', chech_auth, auditorDetails.getOneAuditorById)


module.exports = router;