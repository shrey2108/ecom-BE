const User = require("../models/user.model");

// 200 - OK
// 201 - created
// 400 - Bad request / Client side error
// 401 - Unauthorized
// 404 - Not found
// 500 - Internal Server Error

// create()
// findOne(), find()
// updateOne(), updateMany()
// deleteOne(), deleteMany()

// findById()
// findByIdAndUpdate()
// findByIdAndDelete()

// get single user
async function getUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// get bulk users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// create user
async function createUser(req, res) {
  try {
    const { name, email, role } = req.body;
    const user = await User.create({ name, email, role });
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("Error in creating user", error)
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// update user
async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { name, role, email } = req.body;

    const data = {};
    if (name) data.name = name;
    if (role) data.role = role;
    if (email) data.email = email;

    const user = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// delete User
async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
