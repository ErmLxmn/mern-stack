import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import teacherService from './teacherService'
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  students: [],
}

//get Students
export const getStudents = createAsyncThunk(
  'teacher/getStudents',
  async (teacher, thunkApi) => {
    try {
      return await teacherService.getStudents(teacher)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkApi.rejectWithValue(message)
    }
  }
)

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {})
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.message = action.payload
      })
  },
})

export const { reset } = teacherSlice.actions
export default teacherSlice.reducer
