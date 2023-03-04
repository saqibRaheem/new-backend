const bcrypt = require("bcrypt");
const Auditor = require("../models/auditor");
const auditorRepo = require("../repository/auditor");

const auditorService = {
  addAuditor: (req, res, next) => {
    auditorRepo.addAuditor(req, res);
  },
  getAuditor: (req, res, next) => {
    auditorRepo.getAuditor(res);
  },
  getOneAuditorById: (req, res, next) => {
    auditorRepo.getOneAuditorById(req, res);
  },
  updateAuditor: (req, res, next) => {
    auditorRepo.updateAuditor(req, res);
  },
  deleteAuditor: (req, res, next) => {
    auditorRepo.deleteAuditor(req, res);
  },
};

module.exports = auditorService;
