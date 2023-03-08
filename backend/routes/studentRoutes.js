const express = require('express')
const router = express.Router()
const {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController')

router.route('/').get(getStudents).post(addStudent)
router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent)

module.exports = router
