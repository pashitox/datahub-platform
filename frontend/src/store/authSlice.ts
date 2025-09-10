import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: null | any
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    console.log("🔄 Intentando login con:", credentials.email)
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: 'include',
    })
    
    if (!response.ok) {
      console.error("❌ Login failed:", response.status)
      throw new Error("Login failed")
    }
    
    const data = await response.json()
    console.log("✅ Login exitoso:", data.user.email)
    return data
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        console.log("⏳ Login pendiente...")
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.accessToken
        console.log("🎉 Login completado, redirigiendo...")
        // Redirigir al dashboard
        // window.location.href = "/dashboard"
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Login failed"
        console.error("💥 Login rechazado:", state.error)
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
