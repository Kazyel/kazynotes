const { Sequelize, DataTypes } = require("sequelize");

// Initialzing database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DATABASE_URL,
});

// Model
const Todos = sequelize.define("Todos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Get All Todos
const getAllTodos = async () => {
  const todos = await Todos.findAll();
  return todos;
};

// Create Todos
const createTodo = async (content) => {
  await Todos.create(content);
};

// Update Todos
const updateTodo = async (todo) => {
  await Todos.update(todo, {
    where: {
      id: todo.id,
    },
  });
};

// Delete Todos
const deleteTodo = async (id) => {
  await Todos.destroy({
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
