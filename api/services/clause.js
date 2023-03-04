const clauseRepo = require("../repository/clause");

const clauseService = {
  getAllClauses: (req, res, next) => {
    // ? Get All from Database
    clauseRepo.getAllClauses(res);
  },
  addClause: (req, res, next) => {
    clauseRepo.addClause(req, res);
  },
  insertManyClauses: (req, res, next) => {
    // ? Get All from Database
    clauseRepo.insertManyClauses(res);
  },
  findOne: (req, res, next) => {
    clauseRepo.findOne(req, res);
  },
  findDyna: (req, res, next) => {
    clauseRepo.findDyna(req, res);
  },
  findOneById: (req, res, next) => {
    clauseRepo.findOneById(req, res);
  },
  updateClause: (req, res, next) => {
    clauseRepo.updateClause(req, res);
  },
  deleteClause: (req, res, next) => {
    clauseRepo.deleteClause(req, res);
  },
};

module.exports = clauseService;
