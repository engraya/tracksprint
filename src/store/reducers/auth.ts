import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '../../types/authTypes';

// Load initial state from localStorage if available
const savedUser = localStorage.getItem('currentUser');
const initialState: AuthState = {
  currentUser: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
