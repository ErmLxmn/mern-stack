const mongoose = require('mongoose')

const studentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      default: null,
    },
    grade: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Student', studentSchema)
