const { Todo } = require("../../models/models");

// Get All Todos
const getAllTodos = async (userId) => {
  const todos = await Todo.findAll({
    where: {
      UserId: userId,
    },
  });
  return todos;
};

// Create Todos
const createTodo = async (todo) => {
  await Todo.create(todo);
};

// Update Todos
const updateTodo = async (todo) => {
  const updatedTodo = await Todo.update(todo, {
    where: {
      id: todo.id,
    },
  });
  return updatedTodo;
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
