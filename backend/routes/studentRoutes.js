const express = require('express')
const router = express.Router()
const {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  updateGrade,
} = require('../controllers/studentController')
const { protect } = require('../middleware/authMiddleware')
router.route('/').get(getStudents).post(addStudent).put(updateGrade)
router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent)

module.exports = router
