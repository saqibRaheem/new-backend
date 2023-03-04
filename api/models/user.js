const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyDetails",
  },
  email: String,
  password: String,
  admin: Boolean,
  companyDetails: Boolean,
  name: {
    type: String,
    ref: "CompanyDetails",
  },
});

module.exports = mongoose.model("User", userSchema);
