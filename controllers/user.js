require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const registerValidation = require("../validation/register");
const loginValidation = require("../validation/login");
const { generatePasswordHash, isValidPassword } = require("../utils/password");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate data before creating a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user already exist
    const emailExist = await User.findOne({ email });
    if (emailExist)
      return res.status(400).send("E-mail already exist. Try logging in.");

    // Encrypt user password
    const hashedPassword = await generatePasswordHash(password);

    // Create a new user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  console.log(req, "req");
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    const { error: validationError } = loginValidation(req.body);
    if (validationError)
      return res.status(400).send(validationError.details[0].message);

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (!user) return res.status(404).send("User not found");

    const validPass = await isValidPassword(password, user.password);

    if (user && validPass) {
      // Create token
      jwt.sign(
        {
          email: user.email,
          // secret: user.secret,
        },
        process.env.JWT_TOKEN,
        { expiresIn: "1d" },
        (error, token) => {
          if (error) {
            return res.status(400).send("Error in token generation");
          }

          res.json({
            message: "Login successful",
            token,
          });
        }
      );
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
};

const userDetails = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ email });

    if (!user) res.status(400).send("unable to find user details");

    if (user)
      res.json({
        message: "User fetched successfully",
        user,
      });
  } catch (err) {
    res.status(400).send("Unable to fetch user details");
    console.log(err);
  }
};

const logoutUser = async (req, res) => {
  console.log(req.user, "iii");
  try {
    req.user.token = req.user.token.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send("Unable to logout");
    console.log(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  userDetails,
  logoutUser,
};
