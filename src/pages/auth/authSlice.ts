import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuth } from '../../types/types';
import { RootState } from '../../redux/store';

export interface AuthState {
  isLoggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  auth?: IAuth;
  error?: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  status: 'idle',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signedIn: (state, action: PayloadAction<IAuth>) => {
        state.isLoggedIn = true
        state.status = 'succeeded'
        state.auth = action.payload
    },
    signedOut: (state) => {
      state.isLoggedIn = false
      state.status = 'idle'
      state.auth = {account: '', chainId: ''} as IAuth
    }
  }
})

export const selectAuth = (state: RootState) => state.auth

export const { signedIn, signedOut } = authSlice.actions

export default authSlice.reducer