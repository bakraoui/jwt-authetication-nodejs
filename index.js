// express and environment variables
const express = require('express')
const app = express()
const env = require('dotenv').config()
const port = process.env.PORT | 5000

// midlewares
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// db connection 
const {connection} = require('./config/db')
connection()

// error handler middleware override default error handler
const {errorHandler} = require('./middlewares/errorMiddlware')
app.use(errorHandler)

// tasks routes
const tasksRoutes = require('./routes/tasks')
app.use('/api/tasks',tasksRoutes)


app.listen(port, () =>{ console.log(`server run on port ${port}`); })
