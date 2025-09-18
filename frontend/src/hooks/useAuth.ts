import { useAppSelector, useAppDispatch } from '../store'
import { loginUser, logoutUser, clearError, checkAuthStatus } from '../store/authSlice'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.auth)
  
  return {
    ...authState,
    login: (credentials: { email: string; password: string }) => 
      dispatch(loginUser(credentials)),
    logout: () => dispatch(logoutUser()),
    clearError: () => dispatch(clearError()),
    checkAuth: () => dispatch(checkAuthStatus())
  }
}