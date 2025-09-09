// frontend/src/hooks/useTheme.ts
import { useAppSelector, useAppDispatch } from '../store';
import { toggleTheme } from '../store/uiSlice';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.ui);
  
  const toggle = () => dispatch(toggleTheme());
  
  return { isDarkMode, toggle };
};