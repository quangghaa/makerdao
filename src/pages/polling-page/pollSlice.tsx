import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContractRequest, IPoll, IUserVote } from '../../types/types';
import { RootState } from '../../redux/store';
import { Contract } from 'ethers';

export interface PollState {
  isLoggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  polls?: IPoll[];
  error?: string;
}

const initialState: PollState = {
  isLoggedIn: false,
  status: 'idle',
}

export const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    // pollVoted: (state, action: PayloadAction<IP>) => {
    //   state.isLoggedIn = true
    //   state.status = 'succeeded'
    //   state.auth = action.payload
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPoll.pending, (state, action) => {
        state.status = 'loading'
        // do something
      })
      .addCase(getAllPoll.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isLoggedIn = true
        state.polls = action.payload
      })
      .addCase(getAllPoll.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log("check error: ", action.error.message)
      })
  }
})

export const getAllPoll = createAsyncThunk('poll/getAllPoll', async (contract: Contract) => {
  const response = await contract.getAllPoll()
  return response
})

export const pollVote = createAsyncThunk('poll/pollVote', async (contractRequest: IContractRequest) => {
  console.log("debug contract: ", contractRequest.contract)
  console.log("debug request param: ", contractRequest.param)
  const response = await contractRequest.contract?.voteOnBatchTask(contractRequest.param?.optionId, contractRequest.param.vote)
  console.log("Voted done")
  return response
})

// Action creators are generated for each case reducer function


export const selectPolls = (state: RootState) => state.poll.polls

// export const { fakeSignin } = authSlice.actions

export default pollSlice.reducer