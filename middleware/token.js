const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    

   const abc = jwt.verify(token, process.env.Token_secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      req.user = user;
      
      next();
    });

  
  } catch (err) {
    console.log(err);
  }
};
