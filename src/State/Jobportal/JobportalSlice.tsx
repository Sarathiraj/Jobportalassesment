import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "./interface";

interface JobState {
  jobList: Job[];
  loading: boolean;
  error: string | null;
  applyjob: Job[];
}

const initialState: JobState = {
  jobList: [],
  loading: false,
  error: null,
  applyjob: [],
};

const jobSlice = createSlice({
  name: "Jobportal",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobList = action.payload;
    },
    setapplyjob: (state: any, data) => {
      state.applyjob = [...state.applyjob, data.payload];
    },

    addJob(state, action: PayloadAction<Job>) {
      state.jobList.push(action.payload);
    },
    editJob(state, action: PayloadAction<Job>) {
      const index = state.jobList.findIndex(
        (job) => job.id === action.payload.id
      );
      if (index !== -1) {
        state.jobList[index] = action.payload;
      }
    },
    deleteJob(state, action: PayloadAction<number>) {
      state.jobList = state.jobList.filter((job) => job.id !== action.payload);
    },
  },
});

export const { setapplyjob, setJobs, addJob, editJob, deleteJob } =
  jobSlice.actions;
export default jobSlice.reducer;
