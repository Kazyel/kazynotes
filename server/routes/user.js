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
  await registerUser(req.body);
  res.status(200).send("User Created.");
});

// Login
router.post("/login", async (req, res) => {
  username = req.body.username;
  password = req.body.password;

  try {
    const userResult = await loginUser(username);
    if (
      username == userResult.username &&
      hash(password) == userResult.getDataValue("password")
    ) {
      res.status(200).send("Login Authorized");
    } else {
      res.status(400).send("Wrong password or username.");
    }
  } catch {
    res.status(400).send("User doesn't exist");
  }
});

// Delete user
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await deleteUser(id);
  res.status(200).send("User deleted.");
});

module.exports = router;
