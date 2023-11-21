const {
  getUser,
  registerUser,
  loginUser,
  deleteUser,
} = require("../utils/sql/user_sequelize");

const { hash } = require("../utils/models/models");

const express = require("express");
const router = express.Router();

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  const userData = await getUser(email);
  res.status(200).json(userData);
});

// Register user
router.post("/register", async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(200).send("User Created.");
  } catch {
    res.status(400).send("Email already in use.");
  }
});

// Login
router.post("/login", async (req, res) => {
  email = req.body.email;
  password = req.body.password;

  try {
    const userResult = await loginUser(email);
    if (
      email == userResult.email &&
      hash(password) == userResult.getDataValue("password")
    ) {
      res.status(200).send("Login Authorized");
    } else {
      res.status(400).send("Wrong password.");
    }
  } catch {
    const err = "User does not exist.";
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
