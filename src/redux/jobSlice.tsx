import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./appStore";
import { Job } from "../types";
import { generateCompanyName } from "../utils/generateCompanyName";
import { generateTechStack } from "../utils/generateTechStack";
import { applyFilters, initialJobState } from "./utils";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { getState, rejectWithValue }) => {
    const { currentPage } = (getState() as RootState).jobs;
    const limit = 10;
    const offset = (currentPage - 1) * limit;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const raw = JSON.stringify({
        limit,
        offset,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const totalCount = result.totalCount;
      const jobs = result.jdList.map((data: Job) => ({
        ...data,
        company: generateCompanyName(),
        techStack: generateTechStack(),
      }));

      return { jobs, totalCount };
    } catch (error) {
      console.error("Error fetching jobs:", error);

      return rejectWithValue(
        `Failed to fetch jobs. Please try again later. Read more about the error: ${error}`
      );
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: initialJobState,
  reducers: {
    setMinExperience(state, action) {
      state.filters.minExperience = action.payload;
      state.filteredJobs = applyFilters(state.jobs, state.filters);
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setCompanyName(state, action) {
      const { value, debouncedValue } = action.payload;
      state.filters.companyName = value;
      state.filteredJobs = state.jobs.filter((job) =>
        debouncedValue.length === 0
          ? job.company.toLowerCase().includes(value.toLowerCase())
          : job.company.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      if (value.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setLocations(state, action) {
      state.filters.locations = action.payload;
      state.filteredJobs = applyFilters(state.jobs, state.filters);
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setRemoteOnSite(state, action) {
      state.filters.remoteOnSite = action.payload;
      state.filteredJobs = applyFilters(state.jobs, state.filters);
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setTechStack(state, action) {
      state.filters.techStack = action.payload;
      state.filteredJobs = applyFilters(state.jobs, state.filters);
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setRoles(state, action) {
      state.filters.roles = action.payload;
      state.filteredJobs = applyFilters(state.jobs, state.filters);
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setMinBasePay(state, action) {
      state.filters.minBasePay = action.payload;
      state.filteredJobs = applyFilters(state.jobs, state.filters);
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = [...state.jobs, ...action.payload.jobs];
        state.filteredJobs = [...state.filteredJobs, ...action.payload.jobs];
        state.totalJobs = action.payload.totalCount;
        state.currentPage++;

        if (Object.values(state.filters).some((filter) => filter?.length > 0)) {
          state.filteredJobs = applyFilters(
            [...state.filteredJobs, ...action.payload.jobs],
            state.filters
          );
        }
        if (
          state.filteredJobs.length === 0 &&
          Object.values(state.filters).some((filter) => filter?.length > 0)
        ) {
          state.error = "No jobs found. Please apply some different filter.";
        }
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ||
          "Unknown error occurred. Please try again later.";
      });
  },
});

export const selectAllJobs = (state: RootState) => state.jobs.jobs;
export const getJobsStatus = (state: RootState) => state.jobs.status;
export const getJobsError = (state: RootState) => state.jobs.error;
export const getJobFilters = (state: RootState) => state.jobs.filters;
export const getFilteredJobs = (state: RootState) => state.jobs.filteredJobs;

export const {
  setMinExperience,
  setCompanyName,
  setLocations,
  setRemoteOnSite,
  setTechStack,
  setRoles,
  setMinBasePay,
} = jobSlice.actions;

export default jobSlice.reducer;
