import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContractRequest, IPoll, ISelectedBatch, IUserVote } from '../../types/types';
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
    setPollState: (state, action: PayloadAction<IPoll>) => {
      console.log("SHOW polls: ", state.polls)
      state.polls?.forEach((p: IPoll) => {
        console.log("check polls stateeee: ", p, action.payload)
        if(p.pollId === action.payload.pollId) {
          p.pollState = 1
          console.log("vao day: ", p.pollId)
        } 
      })
    },
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
  try{
    const response = await contract.getAllPoll()
    return response
  } catch(error) {
    console.log("GetAllPoll error: ", error)
    return
  }
})

export const pollVote = createAsyncThunk('poll/pollVote', async (contractRequest: IContractRequest) => {
  try {
    const response = await contractRequest.contract?.voteOnBatchTask(contractRequest.param.batchId, contractRequest.param.pollId)
    return response
  } catch(error) {
    console.log("PollVote error: ", error)
    return
  }
})

// Action creators are generated for each case reducer function
export const selectPolls = (state: RootState) => state.poll.polls

export const { setPollState } = pollSlice.actions

export default pollSlice.reducer