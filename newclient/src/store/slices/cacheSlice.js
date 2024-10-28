import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 1,
}

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCache: (state, action) => {
      return { ...state, id: action.payload }
    },
  },
})

export const { setCache } = cacheSlice.actions
export default cacheSlice.reducer
