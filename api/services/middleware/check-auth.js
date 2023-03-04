const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_KEY, (err, res)=>{
      if (err) {
        return "Token Expired"
      }
      return res
    });

    if(verify == "Token Expired"){
      return res.status(401).json({
        error: "Token Expired",
      });
    }
    
      next();
    
    // if (Date.now() >= verify.exp * 1000) {
    //   return res.status(401).json({
    //     error: "Token Expired",
    //   });
    // } else {
    //   next();
    // }
  } catch (err) {
    return res.status(401).json({
      error: "Invalid Token",
    });
  }
};
