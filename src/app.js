require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

//init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
//init db
require('./dbs/init.mongodb')
const { checkOverLoad } = require('./helpers/check_connect')
checkOverLoad()
//init router

// handling error

module.exports = app