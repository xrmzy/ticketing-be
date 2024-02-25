const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name must be filled in'],
      minlenght: 3,
      maxlenght: 50
    },
    email: {
      type: String,
      required: [true, 'Email must be filled in']
    },
    password: {
      type: String,
      required: [true, 'Password must be filled in'],
      minlenght: 6
    },
    role: {
      type: String,
      enum: ['admin', 'organizer', 'owner'],
      default: 'admin'
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: true
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const User = this
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12)
  }
  next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', userSchema)
