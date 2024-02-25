const mongoose = require('mongoose')
const { model, Schema } = mongoose

const organizersSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, 'Organizer must be filled in']
    }
  },
  { timestamps: true }
)

module.exports = model('Organizer', organizersSchema)
