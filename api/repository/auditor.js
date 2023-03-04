const Auditor = require("../models/auditor");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auditorRepo = {
  addAuditor: async (req, res) => {
    const findAuditor = await Auditor.findOne({ name: req.body.name });

    if (findAuditor)
      return res.status(400).json({ msg: "This Auditor is Already Exist" });

    const auditor = new Auditor({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      site: req.body.site,
      competencies: req.body.competencies,
      startDate: Date.now(),
      auditStandards: req.body.auditStandards
      // audit: req.body.audit
    });

    auditor
      .save()
      .then((result) => {
        res.status(200).json({
          msg: "success",
          newAuditor: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
  getAuditor: (res) => {
    Auditor.find()
    // .populate("audit")
      .then((result) => {
        res.status(200).json({
          auditorData: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  getOneAuditorById: (req, res) => {
    Auditor.findById(req.params.id)
    // .populate("audit")
      .then((result) => {
        res.status(200).json({
          auditorData: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
  updateAuditor: (req, res) => {
    Auditor.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          site: req.body.site,
          competencies: req.body.competencies,
          auditStandards: req.body.auditStandards,
          startDate: Date.now()
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          updated_Auditor: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  deleteAuditor: (req, res) => {
    Auditor.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({
          message: "Auditor Deleted",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
};

module.exports = auditorRepo;
