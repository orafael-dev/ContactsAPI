const express = require("express")
require('express-async-errors')
const routes = require('./routes')
const cors = require("./app/controllers/middlewares/cors")
const errorHandler = require("./app/controllers/middlewares/errorHandler")

const app = express()

app.use(express.json())
app.use(cors)
app.use(routes)
app.use(errorHandler)
app.listen(3001, () => console.log('🔥 - Server starded at http://localhost:3001'))
