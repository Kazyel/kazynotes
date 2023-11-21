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

app.listen(3000, () => console.log("Server Started"));
