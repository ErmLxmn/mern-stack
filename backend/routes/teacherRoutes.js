const express = require('express')
const router = express.Router()
const { getTeachers, getStudents } = require('../controllers/teacherController')
const { protect } = require('../middleware/authMiddleware')
router.route('/').get(getTeachers)
router.route('/:id').get(getStudents)

module.exports = router
