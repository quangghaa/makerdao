import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBatchVote, IContractRequest, IPoll, ISelectedBatch, IUserVote } from '../../types/types';
import { RootState } from '../../redux/store';
import { Contract } from 'ethers';

export interface BidState {
  isLoggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  batchList?: IBatchVote[];
  error?: string;
}

const initialState: BidState = {
  isLoggedIn: false,
  status: 'idle',
}

export const bidSlice = createSlice({
  name: 'bid',
  initialState,
  reducers: {
    setBid: (state, action: PayloadAction<IBatchVote[]>) => {
      state.batchList = action.payload
    },
  }
})


// Action creators are generated for each case reducer function
export const selectBatchList = (state: RootState) => state.bid.batchList

export const { setBid } = bidSlice.actions

export default bidSlice.reducer