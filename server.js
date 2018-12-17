const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const impulzesRouter = require('./routes/impulze')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config/keys')

// Settings
const port = process.env.PORT || 3000
const mongoURI = config.mongoURI
const mongoUser = process.env.MONGODB_USER
const mongoPassword = encodeURIComponent(process.env.MONGODB_PASSWORD)

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/impulze', impulzesRouter)

// Database connection
mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@${mongoURI}`)
  .then(() => console.log('MongoDB connected'))
  .catch(() => console.error('Cannot connect to MongoDB database'))

// We run the server
app.listen(port, function() {
  console.log(`App listening on port ${port}`)
})
