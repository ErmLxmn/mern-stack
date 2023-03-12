import axios from 'axios'

const API_URL = 'api/users/'

//Register
const register = async (user) => {
  const result = await axios.post(API_URL, user)

  if (result.data) {
    localStorage.setItem('user', JSON.stringify(result.data))
    return result.data
  }
}
//login
const login = async (user) => {
  const result = await axios.post(API_URL + 'login', user)

  if (result.data) {
    localStorage.setItem('user', JSON.stringify(result.data))
    return result.data
  }
}

//logout
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
