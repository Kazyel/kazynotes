const { User } = require("../../models/models");

// Get All Todos
const getUser = async (email) => {
  const userData = await User.findOne({
    where: {
      email: email,
    },
  });
  return userData;
};

// Create Todos
const registerUser = async (user) => {
  return await User.create(user);
};

// Update Todos
const loginUser = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  return user;
};

// Delete Todos
const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getUser,
  registerUser,
  loginUser,
  deleteUser,
};
