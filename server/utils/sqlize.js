const { Sequelize, DataTypes } = require("sequelize");

// Initialzing database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DATABASE_URL,
});

// Model
const Todos = sequelize.define("Todos", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Get All Todos
const getAllTodos = async () => {
  const todos = await Todos.findAll();
  return todos
};

// Create Todos
const createTodo = async (todo) => {
  const newTodo = await Todos.create(todo);
};

// Update Todos
const updateTodo = async (todo) => {
  const updateTodo = await Todos.update(todo, {
    where: {
      id: todo.id,
    },
  });
};

// Delete Todos
const deleteTodo = async (todo) => {
  const deletedTodo = await Todos.destroy({
    where: {
      id: todo.id,
    },
  });
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
