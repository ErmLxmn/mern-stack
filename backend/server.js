const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)
app.use('/api/students', require('./routes/studentRoutes'))

app.listen(port, function () {
  console.log(`Started at port: ${port}`)
})
