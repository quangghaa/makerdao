import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import authReducer from '../pages/auth/authSlice'
import batchVoteReducer from '../pages/bidding/batchVoteSlice'
import taskReducer from '../pages/bidding-detail/taskSlice'
import requestReducer from '../pages/polling/requestSlice'
import voteReducer from '../pages/polling/voteSlice'
import yourBidReducer from '../pages/bidding-detail/yourBidSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    batchVote: batchVoteReducer,
    task: taskReducer,
    request: requestReducer,
    vote: voteReducer,
    yourBid: yourBidReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector