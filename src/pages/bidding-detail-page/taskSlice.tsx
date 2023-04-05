import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContractRequest, IPoll, ISelectedBatch, ITask, IUserVote } from '../../types/types';
import { RootState } from '../../redux/store';

export interface TaskState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  tasks?: ITask[];
  error?: string;
}

const initialState: TaskState = {
  status: 'idle',
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskList: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(placeBid.pending, (state, action) => {
        state.status = 'loading'
        // do something
      })
      .addCase(placeBid.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(placeBid.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log("check error: ", action.error.message)
      })
  }
})

export const placeBid = createAsyncThunk('task/placeBid', async (contractRequest: IContractRequest) => {
  try {
    console.log("Check contract: ", contractRequest.contract)
    const response = await contractRequest.contract?.placeBid(contractRequest.param.taskId, contractRequest.param.batchId, contractRequest.param.value)
    
    //Filter EndVote event
    const filter = contractRequest.contract?.filters.PlaceBid(null, null, null, null);
    if(!filter) {
      throw "filter event error"
    }
    const results = await contractRequest.contract?.queryFilter(filter);
    console.log('Check place bid event results: ', results)

    return response
  } catch(error) {
    console.log("PlaceBid error: ", error)
    return
  }
})

// Action creators are generated for each case reducer function
export const selectTasks = (state: RootState) => state.task.tasks

export const { setTaskList } = taskSlice.actions

export default taskSlice.reducer