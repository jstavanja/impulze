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
    select: false,
  },
  // impulzes: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'impulze',
  //     select: false
  //   },
  // ],
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
  User.findOne({ email: email }).select('+password')
    .exec((err, user) => {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.')
        err.status = 401
        return callback(err)
      }

      // we only want to return the things we can share
      const userInfo = {
        _id: user._id, 
        email: user.email,
        username: user.username 
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return callback(null, userInfo)
        } else {
          return callback()
        }
      })
    })
}

const User = mongoose.model('User', UserSchema);
module.exports = User