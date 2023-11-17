const { User } = require("../models/models");

// Get All Todos
const getUser = async (id) => {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  return user;
};

// Create Todos
const registerUser = async (user) => {
  await User.create(user);
};

// Update Todos
const loginUser = async (username, log) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    await User.update({isLoggedIn: log},{
      where: {
        username: username,
      }
    })

    return user;
  } catch (err) {
    console.log(err);
  }
};

const logoutUser = async (username, log) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    await User.update({isLoggedIn: log},{
      where: {
        username: username,
      }
    })

    return user;
  } catch (err) {
    console.log(err);
  }
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
