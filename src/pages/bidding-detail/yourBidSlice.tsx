import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IYourBid } from '../../types/types';
import { RootState } from '../../redux/store';
import { Contract } from 'ethers';

export interface YourBidState {
  yourBidList: IYourBid[];
}

const initialState: YourBidState = {
  yourBidList: []
}

export const yourBidSlice = createSlice({
  name: 'yourBid',
  initialState,
  reducers: {
    setYourBidList: (state, action: PayloadAction<IYourBid[]>) => {
      state.yourBidList = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const selectYourBidList = (state: RootState) => state.yourBid.yourBidList

export const { setYourBidList } = yourBidSlice.actions

export default yourBidSlice.reducer