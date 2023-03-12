const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema(
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
    students: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
      default: null,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Teacher', teacherSchema)
