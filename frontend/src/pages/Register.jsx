import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {
  getTeachers,
  reset as resetTeachers,
} from '../features/student/studentSlice'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    role: '',
    teacher: '',
    password: '',
    confirmPassword: '',
  })

  const { username, name, role, teacher, password, confirmPassword } = formData

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  const { teachers } = useSelector((state) => state.student)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      if (user.role === 'Student') navigate('/student')
      else navigate('/teacher')
    }
    dispatch(reset())
    dispatch(getTeachers())
  }, [user, isError, isLoading, isSuccess, message, navigate, dispatch])

  function onChange(e) {
    const { name, value } = e.target
    setFormData(function (prevFormData) {
      return { ...prevFormData, [name]: value }
    })
  }

  function onSubmit(e) {
    e.preventDefault()

    if (password != confirmPassword) {
      return toast.error('Password not match')
    }

    const user = {
      username,
      name,
      role,
      teacher,
      password,
    }

    dispatch(register(user))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser></FaUser> Register
        </h1>
        <p>Please create an account.</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              placeholder='Enter your username'
              onChange={onChange}
            ></input>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            ></input>
          </div>
          <div className='form-group'>
            <select
              type='text'
              className='form-control'
              id='role'
              name='role'
              value={role}
              onChange={onChange}
            >
              <option value='' disabled>
                Please select role
              </option>
              <option value='Teacher'>Teacher</option>
              <option value='Student'>Student</option>
            </select>
          </div>
          {role === 'Student' ? (
            <>
              <div className='form-group'>
                <select
                  type='text'
                  className='form-control'
                  id='teacher'
                  name='teacher'
                  value={teacher}
                  onChange={onChange}
                >
                  <option value='' disabled>
                    Please select your teacher
                  </option>
                  {teachers.map((teacher, key) => {
                    return (
                      <option key={key} value={teacher._id}>
                        {teacher.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChange}
            ></input>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm password'
              onChange={onChange}
            ></input>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
