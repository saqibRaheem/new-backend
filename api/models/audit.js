const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  auditor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auditor",
  },
  standard: String,
  score: Number,
  nonConformities: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  clauses: Array,
});

module.exports = mongoose.model("Audit", auditSchema);
