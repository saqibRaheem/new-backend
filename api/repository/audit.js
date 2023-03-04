const Audit = require("../models/audit");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auditRepo = {
  addAudit: async (req, res) => {
    // const findAudit = await Audit.findOne({ user: req.body.user });

    // if (findAudit) return res.status(200).json({ audit: findAudit });

    const audit = new Audit({
      _id: new mongoose.Types.ObjectId(),
      standard: req.body.standard,
      score: req.body.score,
      nonConformities: req.body.nonConformities,
      auditor: req.body.auditor,
      user: req.body.user,
      clauses: req.body.clauses,
    });

    audit
      .save()
      .then((result) => {
        res.status(200).json({
          msg: "success",
          newAudit: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
  getAudit: (res) => {
    Audit.find()
      .populate("auditor")
      .populate("user")
      .then((result) => {
        res.status(200).json({
          auditData: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  getOneAuditById: (req, res) => {
    Audit.findById(req.params.id)
      .populate("auditor")
      .populate("user")
      .then((result) => {
        res.status(200).json({
          auditData: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
  getOneAuditByUserId: async (req, res) => {
    await Audit.find({
      user: {
        $all: [req.params.id],
      },
    })
      .populate("auditor")
      .populate("user")
      .then((result) => {
        res.status(200).json({
          auditData: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
  updateAudit: (req, res) => {
    Audit.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          standard: req.body.standard,
          score: req.body.score,
          nonConformities: req.body.nonConformities,
          clauses: req.body.clauses,
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          updated_Audit: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  deleteAudit: (req, res) => {
    Audit.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({
          message: "Audit Deleted",
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

module.exports = auditRepo;
