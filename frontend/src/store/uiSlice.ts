// frontend/src/store/uiSlice.ts
import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  isDarkMode: boolean
  sidebarOpen: boolean
  currentPage: string
}

const initialState: UIState = {
  isDarkMode: false,
  sidebarOpen: false,
  currentPage: 'dashboard',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

export const { toggleTheme, toggleSidebar, setCurrentPage } = uiSlice.actions
export default uiSlice.reducer