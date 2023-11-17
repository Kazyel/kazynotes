const { Sequelize, DataTypes } = require("sequelize");
const { createHash } = require("crypto");

// Initialzing database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DATABASE_URL,
});

function hash(str) {
  return createHash("sha256").update(str).digest("hex");
}

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      get() {
        return () => this.getDataValue("password");
      },
      set(value) {
        this.setDataValue("password", hash(value));
      },
    },
  },
  { timestamps: false }
);

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

User.hasMany(Todo, {
  onDelete: "cascade",
});

Todo.belongsTo(User);

// sequelize.sync({ force: true });

module.exports = {
  Todo,
  User,
  hash,
};
