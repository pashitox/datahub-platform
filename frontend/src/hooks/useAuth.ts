// frontend/src/hooks/useAuth.ts
import { useAppSelector, useAppDispatch } from '../store'
import { loginUser, logout, clearError } from '../store/authSlice'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.auth)
  
  return {
    ...authState, // isAuthenticated, user, token, isLoading, error
    loginUser: (credentials: { email: string; password: string }) => 
      dispatch(loginUser(credentials)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError())
  }
}