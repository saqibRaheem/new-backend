const Clause = require("../models/clause");

const clauseRepo = {
  getAllClauses: (res) => {
    Clause.find()
      .then((result) => {
        res.status(200).json({
          clauseData: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  addClause: async (req, res) => {
    const findClause = await Clause.findOne({ name: req.body.name });

    if (findClause)
      return res.status(400).json({ msg: "This Clause is Already Exist" });

    const clause = new Clause({
      _id: req.body.id,
      name: req.body.name,
      number: req.body.number,
      ancestors: req.body.ancestors,
      parent: req.body.parent,
      children: req.body.children,
      hasQuestion: req.body.hasQuestion,
      question: req.body.question,
      audit: req.body.audit,
    });

    await Clause.findOneAndUpdate(
      { _id: req.body.parent },
      {
        $push: {
          children: req.body.id,
        },
      }
    );

    clause
      .save()
      .then((result) => {
        res.status(200).json({
          msg: "success",
          newclause: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
  insertManyClauses: (res) => {
    // Clause.insertMany([
    //   {
    //     _id: 'ISO 9001:2015',
    //     name: 'ISO 9001:2015',
    //     number: '0',
    //     ancestors: null,
    //     parent: null,
    //     children: ['4'],
    //     hasQuestion: false
    //   },
    //   {
    //     _id: '4',
    //     name: '4th Clause',
    //     number: '4',
    //     ancestors: ['ISO 9001:2015'],
    //     parent: 'ISO 9001:2015',
    //     children: ['4.1'],
    //     hasQuestion: false
    //   },
    //   {
    //     _id: '4.1',
    //     name: '4.1th Clause',
    //     number: '4.1',
    //     ancestors: ['ISO 9001:2015', '4'],
    //     parent: '4',
    //     children: ['4.1.1'],
    //     hasQuestion: false
    //   },
    //   {
    //     _id: '4.1.1',
    //     name: '4.1.1th Clause',
    //     number: '4.1.1',
    //     ancestors: ['ISO 9001:2015', '4', '4.1'],
    //     parent: '4.1',
    //     children: ['4.1.1.a'],
    //     hasQuestion: false
    //   },
    //   {
    //     _id: '4.1.1.a',
    //     name: 'a Clause',
    //     number: '4.1.1.a',
    //     ancestors: ['ISO 9001:2015', '4', '4.1', '4.1.1'],
    //     parent: '4.1.1',
    //     children: null,
    //     hasQuestion: true,
    //     question: [{ question: 'what is the weather?', answer: '' }]
    //   },
    //   {
    //     _id: '4.1.1.b',
    //     name: 'b Clause',
    //     number: '4.1.1.b',
    //     ancestors: ['ISO 9001:2015', '4', '4.1', '4.1.1'],
    //     parent: '4.1.1',
    //     children: null,
    //     hasQuestion: true,
    //     question: [{ question: 'what is MVP model?', answer: '' }]
    //   }
    // ])
    //   .then((result) => {
    //     res.status(200).json({
    //       clauseData: result
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     res.status(500).json({
    //       error: err
    //     })
    //   })
  },
  findOne: (req, res) => {
    const type = req.params.type;
    switch (type) {
      case "_id":
        Clause.find({
          // _id: req.params.clause,
          ancestors: {
            $all: [req.params.clause],
          },
        })
          .populate("ancestors")
          .populate({
            path: "children",
            populate: { path: "children", populate: { path: "children" } },
          })
          .populate("parent")
          .then((result) => {
            res.status(200).json({
              parentData: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
        break;
      case "parent":
        Clause.find({
          parent: {
            $all: [req.params.clause],
          },
        })
          .populate({
            path: "children",
            populate: { path: "children", populate: { path: "children" } },
          })
          .sort({ _id: 0 })
          .then((result) => res.status(200).json({ clauses: result }))
          .catch((err) => {
            res.status(500).json({});
          });
        break;
      case "children":
        Clause.find({
          children: {
            $all: req.params.clause,
          },
        })
          .sort({ _id: 0 })
          .then((result) => res.status(200).json({ clauses: result }))
          .catch((err) => {
            res.status(500).json({});
          });
        break;
      case "ancestors":
        Clause.find({
          ancestors: {
            $all: req.params.clause,
          },
        })
          .sort({ _id: 1 })
          .then((result) => res.status(200).json({ clauses: result }))
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
        break;
    }
  },
  findDyna: (req, res) => {
    const isoStandard = req.params.isoStandard;
    const arrClause = req.params.arrClause.split(",");

    async function findClauses() {
      const results = [];
      for (const clause of arrClause) {
        try {
          const documents = await Clause.find({
            ancestors: {
              $all: [isoStandard, clause],
            },
          }).sort({ _id: 1 });
          results.push(documents);
        } catch (err) {
          console.error(err);
          results.push([]);
        }
      }
      res.status(200).json({ clauses: results.flat() });
    }

    findClauses();
  },
  findOneById: (req, res) => {
    Clause.findById(req.params.id)
      .then((result) => {
        res.status(200).json({
          clauseData: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  updateClause: (req, res) => {
    Clause.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          _id: req.body.id,
          name: req.body.name,
          number: req.body.number,
          ancestors: req.body.ancestors,
          parent: req.body.parent,
          children: req.body.children,
          hasQuestion: req.body.hasQuestion,
          question: req.body.question,
          audit: req.body.audit,
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          updated_Clause: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  deleteClause: async (req, res) => {
    await Clause.findOneAndUpdate(
      { _id: req.body.parent },
      {
        $pull: {
          children: req.body.id,
        },
      }
    );

    Clause.deleteOne({ _id: req.body.id })
      .then((result) => {
        res.status(200).json({
          message: "Clause Deleted",
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

module.exports = clauseRepo;
