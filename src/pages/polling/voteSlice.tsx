import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContractRequest, IPoll, ISelectedBatch, IUserVote } from '../../types/types';
import { RootState } from '../../redux/store';
import { Contract } from 'ethers';

export interface VoteState {
  selectedBatch: ISelectedBatch
}

const initialState: VoteState = {
  selectedBatch: {
    pollId: -1,
    batchId: -1
  }
}

export const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    setSelectedBatch: (state, action: PayloadAction<ISelectedBatch>) => {
      state.selectedBatch = action.payload
    },
  }
})


// Action creators are generated for each case reducer function
export const selectedBatch = (state: RootState) => state.vote.selectedBatch

export const { setSelectedBatch } = voteSlice.actions

export default voteSlice.reducer