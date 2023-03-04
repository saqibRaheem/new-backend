const router = require('express').Router();
const auditService = require('../services/audit');
const chech_auth = require('../services/middleware/check-auth');
// const companyDetails = require('../models/companyDetails');

router.post('/auditDetails', chech_auth, auditService.addAudit)
router.put('/:id', chech_auth, auditService.updateAudit)
router.delete('/:id', chech_auth, auditService.deleteAudit)
router.get('/', chech_auth, auditService.getAudit)
router.get('/:id', chech_auth, auditService.getOneAuditById)
router.get('/user/:id', chech_auth, auditService.getOneAuditByUserId)


module.exports = router;