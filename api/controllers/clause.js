const router = require("express").Router();
// const router = express.Router();
const clauseService = require("../services/clause");
const check_auth = require('../services/middleware/check-auth');



router.get('/all',check_auth, clauseService.getAllClauses);
router.post('/', check_auth, clauseService.insertManyClauses);
router.post('/add', check_auth, clauseService.addClause);
router.post('/:isoStandard/:arrClause',check_auth, clauseService.findDyna);
router.get('/:type/:clause', check_auth, clauseService.findOne);
router.get('/:id', check_auth, clauseService.findOneById);
router.put('/:id', check_auth, clauseService.updateClause);
router.delete('/', check_auth, clauseService.deleteClause);

module.exports = router;