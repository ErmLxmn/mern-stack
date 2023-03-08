let students = require('../models/student')
const asyncHandler = require('express-async-handler')

asyncHandler(async function getStudents(req, res) {
  res.json(students.length > 0 ? students : { message: 'Add Student first.' })
})

asyncHandler(async function getStudent(req, res) {
  let student = students.find(function (student) {
    return student.studentId === parseInt(req.params.id)
  })
  res.json(student || { message: 'No Student.' })
})

asyncHandler(async function addStudent(req, res) {
  let studentId = 1
  if (students.length > 0)
    newStudentNumber = students[students.length - 1].studentId + 1

  students.push({
    name: req.body.name,
    studentId: studentId,
    isUpdated: false,
  })

  res.json({ message: `${req.body.name} added.` })
})

asyncHandler(async function updateStudent(req, res) {
  students = students.map(function (student) {
    if (student.studentId === parseInt(req.params.id)) {
      student.name = req.body.name
      student.isUpdated = true
      return student
    }
    return student
  })

  res.json({
    message: `Student ${req.params.id} Updated.`,
  })
})

asyncHandler(async function deleteStudent(req, res) {
  let deletedStudent = {}

  students = students.filter(function (student) {
    if (student.studentId === parseInt(req.params.id)) deletedStudent = student
    return student.studentId !== parseInt(req.params.id)
  })

  res.json({ message: `Deleted ${deletedStudent.name}.` })
})

module.exports = {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
}
