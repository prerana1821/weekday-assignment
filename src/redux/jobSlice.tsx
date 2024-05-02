import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./appStore";
import { Job } from "../types";
import axios from "axios";

interface JobState {
  jobs: Job[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error?: string;
}

const initialState: JobState = {
  jobs: [],
  status: "idle",
  error: "",
};

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await axios.post(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    {
      limit: 10,
      offset: 0,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response.data);
  return response.data.jdList;
});

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllJobs = (state: RootState) => state.jobs.jobs;
export const getJobsStatus = (state: RootState) => state.jobs.status;
export const getJobsError = (state: RootState) => state.jobs.error;

export default jobSlice.reducer;
