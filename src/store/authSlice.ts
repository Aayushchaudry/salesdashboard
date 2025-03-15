import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null; // Store user ID
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const { email, password } = action.payload;
      // Hardcoded credentials for testing
      const validEmail = 'test@example.com';
      const validPassword = 'password123';

      if (email === validEmail && password === validPassword) {
        state.isAuthenticated = true;
        state.userId = email; // Use email as user ID
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userId = null; // Clear user ID on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
