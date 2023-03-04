const mongoose = require("mongoose");

const dummyClauseSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("DummyClause", dummyClauseSchema);
