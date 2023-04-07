import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import authReducer from '../pages/auth/authSlice'
import pollReducer from '../pages/polling-page/pollSlice'
import bidReducer from '../pages/bidding-page/bidSlice'
import taskReducer from '../pages/bidding-detail-page/taskSlice'
import requestReducer from '../pages/polling-page/requestSlice'
import voteReducer from '../pages/polling-page/voteSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    poll: pollReducer,
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