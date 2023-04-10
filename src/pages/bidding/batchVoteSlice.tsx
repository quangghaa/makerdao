import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBatchVote, IContractRequest, IPoll, ISelectedBatch, IUserVote } from '../../types/types';
import { RootState } from '../../redux/store';
import { Contract } from 'ethers';

export interface BatchVoteState {
  winList?: IBatchVote[];
  error?: string;
}

const initialState: BatchVoteState = {
  winList: [] as IBatchVote[]
}

export const batchVoteSlice = createSlice({
  name: 'batchVote',
  initialState,
  reducers: {
    setWinList: (state, action: PayloadAction<IBatchVote[]>) => {
      state.winList = action.payload
    },
  }
})


// Action creators are generated for each case reducer function
export const selectWinList = (state: RootState) => state.batchVote.winList

export const { setWinList } = batchVoteSlice.actions

export default batchVoteSlice.reducer