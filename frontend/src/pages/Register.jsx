import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const { username, password, confirmPassword } = formData

  function onChange(e) {
    const { name, value } = e.target
    setFormData(function (prevFormData) {
      return { ...prevFormData, [name]: value }
    })
  }

  function onSubmit(e) {
    e.preventDefault()
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
