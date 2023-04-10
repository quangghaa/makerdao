import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISelectedBatch } from '../../types/types';
import { RootState } from '../../redux/store';

export interface VoteState {
  selectedBatchList: ISelectedBatch[]
}

const initialState: VoteState = {
  selectedBatchList: []
}

export const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    setSelectedBatchList: (state, action: PayloadAction<ISelectedBatch[]>) => {
      state.selectedBatchList = action.payload
    },
  }
})


// Action creators are generated for each case reducer function
export const selectSelectedBatchList = (state: RootState) => state.vote.selectedBatchList

export const { setSelectedBatchList } = voteSlice.actions

export default voteSlice.reducer