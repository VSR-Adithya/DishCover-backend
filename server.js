require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const searchRoutes = require('./routes/search')
const userRoutes = require('./routes/user')

// Create express app
const app = express()

// Middleware to parse JSON request bodies
app.use(express.json())
app.use(cors({
  origin: [ 'http://localhost:3000', 'https://dishcover.onrender.com/'], 
}))

// Middleware to log incoming requests
const loggerMiddleware = (req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`)
  next()
}

// Register the logger middleware in your Express app
app.use(loggerMiddleware)

// Register the routes
app.use('/recipes', searchRoutes) // Use the searchRoutes router
app.use('/api/user', userRoutes) // Use the userRoutes router


// Set 'strictQuery' to false to suppress deprecation warning
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to MongoDB")
    })
  })
  .catch((error) => {
    console.log(error)
  })
