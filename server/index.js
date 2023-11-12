require('dotenv').config()

const sqlite3 = require("sqlite3").verbose()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const todos = require('./routes/todos')
app.use('/todos', todos)

const db = new sqlite3.Database(process.env.DATABASE_URL, sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})

// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to database'))

app.listen(3000, () => console.log('Server Started'))