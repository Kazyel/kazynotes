const {
  getUser,
  registerUser,
  loginUser,
  deleteUser,
} = require("../utils/sql/user_sequelize");

const { hash } = require("../utils/models/models");

const express = require("express");
const router = express.Router();

// Get user info
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const userResult = await getUser(id);
  res.status(200).json(userResult);
});

// Register user
router.post("/register", async (req, res) => {
  try{
    await registerUser(req.body);
    res.status(200).send("User Created.");  
  } catch {
    res.status(400).send("User already exists.")
  }
});

// Login
router.post("/login", async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  log = req.body.isLoggedIn;
  
  try {
    const userResult = await loginUser(username, log);
    if (
      username == userResult.username &&
      hash(password) == userResult.getDataValue("password")
    ) {
      res.status(200).send("Login Authorized");
    } else {
      res.status(400).send("Wrong password.");
    }
  } catch {
    const err = "User does not exist."
    res.status(400).json(err);
  }
});
// Delete user
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await deleteUser(id);
  res.status(200).send("User deleted.");
});

module.exports = router;
