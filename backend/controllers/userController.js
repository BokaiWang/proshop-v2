import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   Register user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ email, name, password });
  generateToken(res, user._id);
  res.status(201).json({
    id: user._id,
    email: user.email,
    password: user.password,
    name: user.name,
  });
});

// @desc   Logout user & clear cookie
// @route  POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // We have a user property on req because of the protect middleware we created
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  }
  res.status(404);
  throw new Error("User not found");
});

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, email, password } = req.body;
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    throw new Error("User not found");
  }
});

// @desc   Get all users
// @route  GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.json("get users");
});

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.json("get user by ID");
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.json("delete user");
});

// @desc   Update user
// @route  PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.json("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
