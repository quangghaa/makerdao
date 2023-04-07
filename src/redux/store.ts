import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import authReducer from '../pages/auth/authSlice'
import bidReducer from '../pages/bidding/bidSlice'
import taskReducer from '../pages/bidding-detail/taskSlice'
import requestReducer from '../pages/polling/requestSlice'
import voteReducer from '../pages/polling/voteSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bid: bidReducer,
    task: taskReducer,
    request: requestReducer,
    vote: voteReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector