const express = require("express");
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../utils/sqlize");

const router = express.Router();

// Get all Todos
router.get("/", async (req, res) => {
  const results = await getAllTodos();
  res.status(200).json(results);
});

// Creating
router.post("/", async (req, res) => {
  await createTodo(req.body);
  res.status(200).send("To-do Created.");
});

// Updating
router.patch("/", async (req, res) => {
  await updateTodo(req.body.content);
  res.status(200).send("To-do Updated.");
});

// Delete one
router.delete("/", async (req, res) => {
  await deleteTodo(req.body.id);
  res.status(200).send("To-do Deleted.");
});

module.exports = router;
