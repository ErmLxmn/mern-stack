import axios from 'axios'

const API_URL_STUDENT = 'api/students/'
const API_URL_TEACHER = 'api/teachers/'

//getTeachers
const getTeachers = async () => {
  const result = await axios.get(API_URL_TEACHER)
  if (result.data) {
    return result.data
  }
}
//Save Grades
const saveGrades = async (data) => {
  const result = await axios.put(API_URL_STUDENT, data)
  if (result.data) {
    return result.data
  }
}
const studentService = {
  getTeachers,
  saveGrades,
}

export default studentService
