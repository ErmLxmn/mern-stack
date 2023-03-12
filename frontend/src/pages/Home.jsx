import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function Home() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  if (user) {
    if (user.role === 'Student') return navigate('/student')
    if (user.role === 'Teacher') return navigate('/teacher')
  }
  return <div>Home</div>
}

export default Home
