const auditRepo = require("../repository/audit");

const auditService = {
  addAudit: (req, res, next) => {
    auditRepo.addAudit(req, res);
  },
  getAudit: (req, res, next) => {
    auditRepo.getAudit(res);
  },
  getOneAuditById: (req, res, next) => {
    auditRepo.getOneAuditById(req, res);
  },
  getOneAuditByUserId: (req, res, next) => {
    auditRepo.getOneAuditByUserId(req, res);
  },
  updateAudit: (req, res, next) => {
    auditRepo.updateAudit(req, res);
  },
  deleteAudit: (req, res, next) => {
    auditRepo.deleteAudit(req, res);
  },
};

module.exports = auditService;
