const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const impulzesRouter = require('./routes/impulze')
const usersRouter = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')

const authUtils = require('./utils/authUtil')

// Settings
const port = process.env.PORT || 3000
const mongoURI = process.env.MONGODB_URI
const mongoUser = process.env.MONGODB_USER
const mongoPassword = encodeURIComponent(process.env.MONGODB_PASSWORD)

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/impulze', authUtils.verifyToken, impulzesRouter)
app.use('/api/auth', usersRouter)

// Database connection
mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@${mongoURI}`)
  .then(() => console.log('MongoDB connected'))
  .catch((e) => console.error(e))

// We run the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
