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
  res.status(200).json(results)
});

// Creating

router.post("/", async (req, res) => {
  const newTodo = await createTodo(req.body);
  res.status(201).send("New todo created");
});

// Updating

router.patch("/", async (req, res) => {
  const updatedTodo = await updateTodo(req.body);
  res.status(201).send("Todo updated!");
});

// Delete one
router.delete("/", async (req, res) => {
  const deletedTodo = await deleteTodo(req.body);
  res.status(201).send("Todo deleted.");
});

module.exports = router;
