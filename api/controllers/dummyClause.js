const express = require("express");
const router = express.Router();
const dummyClauseService = require("../services/dummyClause");
const check_auth = require('../services/middleware/check-auth');


router.post('/', check_auth, dummyClauseService.addDummyClause);

router.get('/', dummyClauseService.getDummyClause);

router.get('/:id', check_auth, dummyClauseService.getOneDummyClauseById);

router.put('/:id', check_auth, dummyClauseService.updateDummyClause);

router.delete('/:id', check_auth, dummyClauseService.deleteDummyClause);

module.exports = router;