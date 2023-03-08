const mongoose = require('mongoose')

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to ' + conn.connection.host)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
