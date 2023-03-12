import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import studentService from './studentService'
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  teachers: [],
  isError: false,
  isSucces: false,
  isLoading: false,
  message: '',
  graded: {},
}

//getTeachers
export const getTeachers = createAsyncThunk(
  'student/getTeachers',
  async (_, thunkApi) => {
    try {
      return await studentService.getTeachers()
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

//getTeachers
export const saveGrades = createAsyncThunk(
  'student/saveGrades',
  async (data, thunkApi) => {
    try {
      return await studentService.saveGrades(data)
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

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSucces = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeachers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucces = true
        state.teachers = action.payload
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(saveGrades.pending, (state) => {
        state.isLoading = true
        state.graded = {}
      })
      .addCase(saveGrades.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucces = true
        state.message = ''
      })
      .addCase(saveGrades.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = studentSlice.actions
export default studentSlice.reducer
