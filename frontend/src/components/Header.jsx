import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  let headerText = <Link to='/'>Home</Link>
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onClick = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  if (user) {
    if (user.role === 'Student')
      headerText = <Link to='/student'>Student Dashboard</Link>
    else headerText = <Link to='/teacher'>Teacher Dashboard</Link>
  }

  return (
    <header className='header'>
      <div className='logo'>{headerText}</div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onClick}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
