import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getStudents, reset } from '../features/teacher/teacherSlice'
import $ from 'jquery'
import { useState } from 'react'
import { saveGrades } from '../features/student/studentSlice'
import Spinner from '../components/Spinner'

function Teacher() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [btnText, setBtnText] = useState('Edit Grades')
  const [editable, setEditable] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { students, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.teacher
  )

  useEffect(() => {
    dispatch(getStudents(user.id))
    dispatch(reset())
  }, [user, isError, isLoading, isSuccess, message, navigate, dispatch])

  if (user) {
    if (user.role === 'Student') return navigate('/student')
  } else {
    return navigate('/')
  }

  function onClick(e) {
    if (btnText === 'Edit Grades') {
      setBtnText('Save Grades')
      setEditable(true)
    } else {
      setBtnText('Edit Grades')
      setEditable(false)
      const data = $.map($('.grade'), (val) => {
        return { student: val.id, grade: parseInt(val.innerText) }
      })

      dispatch(saveGrades(data))
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div>
        <button onClick={onClick} className='btn float-end btn-small'>
          {btnText}
        </button>
      </div>
      <div className='table-container'>
        <table id='student-table'>
          <thead>
            <tr>
              <th>Student</th>
              <th className='grade-th'>Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, key) => {
              return (
                <tr key={key}>
                  <td>{student.name}</td>
                  <td>
                    <div
                      id={student._id}
                      className='text-center grade'
                      contentEditable={editable}
                      onKeyDown={onKeyDown}
                      suppressContentEditableWarning={true}
                    >
                      {student.grade || ''}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Teacher
