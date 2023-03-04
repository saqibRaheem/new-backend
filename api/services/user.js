const bcrypt = require("bcrypt");
const User = require("../models/user");
const userRepo = require("../repository/user");

const userService = {
  signup: (req, res, next) => {
   

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        userRepo.signup(req, res, hash);
      }
    });
  },

  logout: (req, res, next) => {
    userRepo.logout(req, res, next);
  },

  login: (req, res, next) => {
    User.find({
      email: req.body.email,
    })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({
            msg: "User not exist",
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (error, result) => {
          if (!result) {
            return res.status(401).json({
              msg: "Password mismatch",
            });
          }

          if (result) {
            userRepo.login(req, res, user);
          }
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  },

  getAllUsers: (req, res, next) => {
    // ? Get All from Database
    userRepo.getAllUsers(res);
  },

  getOneUserById: (req, res, next) => {
    // ? Get All from Database
    userRepo.getOneUserById(req, res);
  },

  updateUser: (req, res, next) => {
    userRepo.updateUser(req, res);
  },

  deleteUser: (req, res, next) => {
    userRepo.deleteUser(req, res);
  },
};

module.exports = userService;
