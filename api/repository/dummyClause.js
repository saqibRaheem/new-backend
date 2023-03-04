const DummyClause = require("../models/dummyClause");
require("dotenv").config();

const dummyClauseRepo = {
  addDummyClause: async (req, res) => {
    const findAuditor = await DummyClause.findOne({ name: req.body.name });

    if (findAuditor)
      return res.status(400).json({ msg: "This Clause is Already Exist" });

    const dummyClause = new DummyClause({
      name: req.body.name,
    });

    dummyClause
      .save()
      .then((result) => {
        res.status(200).json({
          msg: "success",
          newDummyClause: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
  getDummyClause: (res) => {
    DummyClause.find()
      .then((result) => {
        res.status(200).json({
            dummyClauseData: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  getOneDummyClauseById: (req, res) => {
    DummyClause.findById(req.params.id)
      .then((result) => {
        res.status(200).json({
            dummyClauseData: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
  updateDummyClause: (req, res) => {
    DummyClause.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
          },
        }
      )
        .then((result) => {
          res.status(200).json({
            updated_DummyClause: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
  },
  deleteDummyClause: (req, res) => {
    DummyClause.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({
          message: "DummyClause Deleted",
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

module.exports = dummyClauseRepo;
