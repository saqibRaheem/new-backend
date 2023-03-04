const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRepo = {
  signup: async (req, res, hash) => {
    const findEmail = await User.findOne({ email: req.body.email });

    if (findEmail)
      return res.status(400).json({ msg: "This Email is Alrady Exist" });

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hash,
      admin: req.body.admin,
      companyDetails: req.body.companyDetails,
      // company: {}
    });

    user
      .save()
      .then((result) => {
        res.status(200).json({
          msg: "success",
          newUser: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  login: (req, res, user) => {
    const token = jwt.sign(
      {
        email: user[0].email,
        admin: user[0].admin,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      msg: "Login Successful",
      email: user[0].email,
      admin: user[0].admin,
      token: token,
      id: user[0]._id,
      company:user[0].company,
      companyDetails: user[0].companyDetails,
      name: user[0].name
    });
  },

  logout: (req, res, next) => {
    
  },

  getAllUsers: (res) => {
    User.find()
      .populate("company")
      .then((result) => {
        res.status(200).json({
          userData: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  getOneUserById: (req, res) => {
    User.findById(req.params.id)
      .populate("company")
      .then((result) => {
        res.status(200).json({
          studentData: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  updateUser: (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          admin: req.body.admin,
          companyDetails: req.body.companyDetails,
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          updated_User: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  deleteUser: (req, res) => {
    User.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({
          message: "User Deleted",
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

module.exports = userRepo;
