const User = require("../models/user.model");
const api = require("../utils/api");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const existingUser = await User.findOne({email: email});
    if(existingUser){
      return api.error(res, "Error", "User does not exist", 400);
    }

    // create user
    const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = await User.create({name, email, role, password: hash});

    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, process.env.JWT_SECRET);

    api.success(res, {token}, "User registered successfully", 201);
  } catch (error) {
    api.error(res, error.message, "Something went wrong in registering user");
  }
}

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user){
      return api.error(res, "Error", "Invalid credentials", 400);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return api.error(res, "Error", "Invalid credentials", 400);

    // token
    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, process.env.JWT_SECRET);

    api.success(res, {token}, "User loggedin successfully")
  } catch (error) {
    api.error(res, error.message, "Something went wrong in validating user");
  }
}