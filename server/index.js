require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const todos = require("./routes/todos");
const user = require("./routes/user");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/todos", todos);
app.use("/user", user);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log("Server Started"));
