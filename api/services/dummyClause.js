const dummyClauseRepo = require("../repository/dummyClause");

const dummyClauseService = {
  addDummyClause: (req, res, next) => {
    dummyClauseRepo.addDummyClause(req, res);
  },
  getDummyClause: (req, res, next) => {
    dummyClauseRepo.getDummyClause(res);
  },
  getOneDummyClauseById: (req, res, next) => {
    dummyClauseRepo.getOneDummyClauseById(req, res);
  },
  updateDummyClause: (req, res, next) => {
    dummyClauseRepo.updateDummyClause(req, res);
  },
  deleteDummyClause: (req, res, next) => {
    dummyClauseRepo.deleteDummyClause(req, res);
  },
};

module.exports = dummyClauseService;
