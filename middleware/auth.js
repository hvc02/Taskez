require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN, async (error, payload) => {
      if (error) {
        return res.status(403).send("Invalid Token");
      }
      try {
        const email = payload.email;

        const user = await User.findOne({ email });

        if (!user) {
          return res.status(403).send("Invalid credentials");
        }
        // else if (payload.secret !== user.secret) {
        //   return res.status(403).send("Unauthorized access attempted");
        // }
        req.user = payload;
        next();
      } catch (error) {
        return res.status(400).send("Some error occurred");
      }
    });
  } else {
    return res.status(403).send("Unauthorized access attempted");
  }
};

module.exports = verifyToken;
