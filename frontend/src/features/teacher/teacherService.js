import axios from 'axios'

const API_URL_STUDENT = 'api/students/'
const API_URL_TEACHER = 'api/teachers/'

//getStudents
const getStudents = async (teacher) => {
  const result = await axios.get(API_URL_TEACHER + teacher)
  if (result.data) {
    return result.data
  }
}

const teacherService = {
  getStudents,
}

export default teacherService
