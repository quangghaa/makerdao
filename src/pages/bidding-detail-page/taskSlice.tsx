import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContractRequest, IPoll, ISelectedBatch, ITask, IUserVote } from '../../types/types';
import { RootState } from '../../redux/store';
import { Contract } from 'ethers';

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
})

// Action creators are generated for each case reducer function
export const selectTasks = (state: RootState) => state.task.tasks

export const { setTaskList } = taskSlice.actions

export default taskSlice.reducer