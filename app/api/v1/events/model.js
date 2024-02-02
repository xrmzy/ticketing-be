const mongoose = require('mongoose')

const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please fill the type of tickets']
  },
  price: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true
  },
  expired: {
    type: Date
  }

})

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please fill the title'],
    minlenght: 3,
    maxlenght: 50
  },
  date: {
    type: Date,
    required: [true, 'Please fill the date']
  },
  tagline: {
    type: String,
    required: [true, 'Please fill the tagline']
  },
  keyPoint: {
    type: [String]
  },
  vanueName: {
    type: String,
    required: [true, 'Please fill the vanue events']
  },
  statusEvent: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  tickets: {
    type: [ticketCategoriesSchema],
    required: true
  },
  image: {
    type: mongoose.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Talent',
    required: true
  }
},
{ timeStamps: true }
)

module.exports = mongoose.model('Event', EventSchema)
