import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContractRequest, IPoll, ISelectedBatch, IUserVote } from '../../types/types';
import { RootState } from '../../redux/store';
import { Contract } from 'ethers';

export interface PollState {
  isLoggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  polls?: IPoll[];
  pollsVoting?: IPoll[];
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
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPoll.pending, (state, action) => {
        state.status = 'loading'
        // do something
      })
      .addCase(getAllPoll.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.polls = action.payload
      })
      .addCase(getAllPoll.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log("check error: ", action.error.message)
      })

      .addCase(getAllPollVoting.pending, (state, action) => {
        state.status = 'loading'
        // do something
      })
      .addCase(getAllPollVoting.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.pollsVoting = action.payload
      })
      .addCase(getAllPollVoting.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log("check error: ", action.error.message)
      })
  }
})

export const getAllPoll = createAsyncThunk('poll/getAllPoll', async (contract: Contract) => {
  try {
    const response = await contract.getAllPoll()
    return response
  } catch (error) {
    console.log("GetAllPoll error: ", error)
    return
  }
})

export const getAllPollVoting = createAsyncThunk('poll/getAllPollVoting', async (contract: Contract) => {
  try {
    const response = await contract.getAllPollVoting()
    return response
  } catch (error) {
    console.log("getAllPollVoting error: ", error)
    return
  }
})

export const pollVote = createAsyncThunk('poll/pollVote', async (contractRequest: IContractRequest) => {
  try {
    const response = await contractRequest.contract?.voteOnBatchTask(contractRequest.param.batchId, contractRequest.param.pollId)

    // VoteOnBatchTask
    //Filter EndVote event
    console.log("DEBUG param: ", contractRequest.param)
    const filter = contractRequest.contract?.filters.VoteOnBatchTask(contractRequest.param.pollId, null, null, contractRequest.param.account);
    if(!filter) {
      return
    }
    const results = await contractRequest.contract?.queryFilter(filter);
    console.log("results: ", results)

    return response
  } catch (error) {
    console.log("PollVote error: ", error)
    return
  }
})

// Action creators are generated for each case reducer function
export const selectPollState = (state: RootState) => state.poll
export const selectPolls = (state: RootState) => state.poll.polls

// export const { setPollState } = pollSlice.actions

export default pollSlice.reducer