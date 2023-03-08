const mongoose = require('mongoose')

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ['Please enter a name'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Student', studentSchema)
