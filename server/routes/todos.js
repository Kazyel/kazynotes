const express = require("express");
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../utils/sql/todo_sequelize");

const router = express.Router();
// Get all User Todos
router.get("/:id", async (req, res) => {
  const results = await getAllTodos(req.params.id);
  res.status(200).json(results);
});

// Creating
router.post("/", async (req, res) => {
  await createTodo(req.body);
  res.status(200).send("To-do Created.");
});

// Updating
router.patch("/:id", async (req, res) => {
  await updateTodo(req.body, req.params.id);
  const results = await getAllTodos(req.params.id);
  res.status(200).json(results);
});

// Delete one
router.delete("/", async (req, res) => {
  await deleteTodo(req.body.id);
  res.status(200).send("To-do Deleted.");
});

module.exports = router;
