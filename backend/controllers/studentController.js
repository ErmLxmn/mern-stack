const Student = require('../models/student')
const asyncHandler = require('express-async-handler')

const getStudents = asyncHandler(async function (req, res) {
  const students = await Student.find()
  res.json(students)
})

const getStudent = asyncHandler(async function (req, res) {
  const student = await Student.findById(req.params.id)
  res.json(student || { message: 'No Student.' })
})

const addStudent = asyncHandler(async function (req, res) {
  const isExist = await Student.exists({ name: req.body.name })

  if (isExist) {
    return res.json({ message: 'name already exist' })
  }

  const student = await Student.create({
    name: req.body.name,
    user: req.user.id,
  })

  res.json(
    student
      ? { message: `Student: ${student.name} with ID: ${student._id} added.` }
      : { message: 'Failed' }
  )
})

const updateGrade = asyncHandler(async function (req, res) {
  let student = req.body
  let gradedStudents = []

  for (let i = 0; i < student.length; i++) {
    let updateGrade = await Student.findByIdAndUpdate(student[i].student, {
      grade: student[i].grade,
    })
    gradedStudents.push(updateGrade)
  }
  res.json({ graded: gradedStudents })
})

const updateStudent = asyncHandler(async function (req, res) {
  const isExist = await Student.exists({ _id: req.params.id })

  if (!isExist) {
    return res.json({ message: 'No Student' })
  }

  const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body)

  res.json({
    message: `Student ${updateStudent._id} Updated.`,
  })
})

const deleteStudent = asyncHandler(async function (req, res) {
  const isExist = await Student.exists({ _id: req.params.id })

  if (!isExist) {
    return res.json({ message: 'No Student' })
  }

  const deletedStudent = await Student.findByIdAndDelete(req.params.id)

  res.json({ message: `Deleted ${deletedStudent.name}.` })
})

module.exports = {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  updateGrade,
}
