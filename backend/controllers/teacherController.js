const Teacher = require('../models/teacher')
const Student = require('../models/student')
const asyncHandler = require('express-async-handler')
const { model } = require('mongoose')

const getTeachers = asyncHandler(async function (req, res) {
  const teachers = await Teacher.find()
  res.json(teachers)
})

const getStudents = asyncHandler(async function (req, res) {
  let teacher = await Teacher.findOne({ user: req.params.id })
  let students = await Student.find({ teacher: teacher._id })
  res.json(students)
})

module.exports = { getStudents, getTeachers }
