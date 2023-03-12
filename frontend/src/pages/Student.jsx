import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Student() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  if (user) {
    if (user.role === 'Teacher') return navigate('/teacher')
  } else {
    return navigate('/')
  }
  return <div>Student</div>
}

export default Student
