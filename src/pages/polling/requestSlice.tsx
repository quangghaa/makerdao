import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContractRequest, IPoll, IRequest, ISelectedBatch, IUserVote } from '../../types/types';
import { RootState } from '../../redux/store';
import { Contract } from 'ethers';

export interface RequestState {
  request: IRequest;
  error?: string;
}

const initialState: RequestState = {
  request: {}
}

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setSelectedBatchRequest: (state, action: PayloadAction<ISelectedBatch>) => {
      state.request.selectedBatch = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const selectRequest = (state: RootState) => state.request

export const { setSelectedBatchRequest } = requestSlice.actions

export default requestSlice.reducer