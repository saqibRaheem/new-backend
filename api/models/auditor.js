const mongoose = require("mongoose");

const auditorSchema = new mongoose.Schema({
  name: String,
  site: String,
  competencies: String,
  startDate: Date,
  auditStandards: String,
  audit: { type: mongoose.Schema.Types.ObjectId, ref: "Audit" },
});

module.exports = mongoose.model("Auditor", auditorSchema);




