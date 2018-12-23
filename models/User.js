const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  impulzes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'impulze'
    }
  ],
})

// @REGISTER
UserSchema.pre('save', function (next) {
  let user = this
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

// @LOGIN
UserSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ email: email })
    .exec((err, user) => {

      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.')
        err.status = 401
        return callback(err)
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return callback(null, user)
        } else {
          return callback()
        }
      })
    })
}

const User = mongoose.model('User', UserSchema);
module.exports = User