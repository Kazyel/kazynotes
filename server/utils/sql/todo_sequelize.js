const { Todo } = require("../models/models");

// Get All Todos
const getAllTodos = async () => {
  const todos = await Todo.findAll();
  return todos;
};

// Create Todos
const createTodo = async (content) => {
  await Todo.create(content);
};

// Update Todos
const updateTodo = async (todo) => {
  const updatedTodo = await Todo.update(todo, {
    where: {
      id: todo.id,
    },
  });
  return updateTodo;
};

// Delete Todos
const deleteTodo = async (id) => {
  await Todo.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
