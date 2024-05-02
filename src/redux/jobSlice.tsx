import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./appStore";
import { Job } from "../types";
import axios from "axios";

interface JobState {
  jobs: Job[];
  filteredJobs: Job[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error?: string;
  filters: {
    minExperience: string[];
    companyName: string;
    locations: string[];
    remoteOnSite: string[];
    techStack: string[];
    roles: string[];
    minBasePay: string[];
  };
}

const initialState: JobState = {
  jobs: [],
  filteredJobs: [],
  status: "idle",
  error: "",
  filters: {
    minExperience: [],
    companyName: "",
    locations: [],
    remoteOnSite: [],
    techStack: [],
    roles: [],
    minBasePay: [],
  },
};

const generateCompanyName = () => {
  const prefixes = ["ABC", "XYZ", "Tech", "Global", "Innovative"];
  const suffixes = ["Corp", "Ltd", "Inc", "Services", "Solutions"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${randomPrefix} ${randomSuffix}`;
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

  // TODO: job type without company name
  return response.data.jdList.map((data: Job) => {
    return { ...data, company: generateCompanyName() };
  });
});

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setMinExperience(state, action) {
      state.filters.minExperience = action.payload;
      state.filteredJobs = state.jobs.filter((job) => {
        const minExp = job.minExp || 0;
        return state.filters.minExperience.includes(minExp.toString());
      });
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setCompanyName(state, action) {
      state.filters.companyName = action.payload;
      state.filteredJobs = state.jobs.filter((job) =>
        job.company.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setLocations(state, action) {
      state.filters.locations = action.payload;
      state.filteredJobs = state.jobs.filter((job) => {
        return state.filters.locations.includes(job.location.toLowerCase());
      });
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setRemoteOnSite(state, action) {
      state.filters.remoteOnSite = action.payload;
      state.filteredJobs = state.jobs.filter((job) =>
        // TODO: need to fix this
        // state.filters.remoteOnSite.includes(job.remoteOnSite)
        state.filters.remoteOnSite.includes(job.location)
      );
    },
    setTechStack(state, action) {
      state.filters.techStack = action.payload;
      state.filteredJobs = state.jobs.filter((job) =>
        // TODO: need to fix this
        // state.filters.techStack.some((tech) => job.techStack.includes(tech))
        state.filters.techStack.includes(job.jobRole)
      );
    },
    setRoles(state, action) {
      state.filters.roles = action.payload;
      state.filteredJobs = state.jobs.filter((job) =>
        // TODO: need to fix this
        // state.filters.roles.some((role) => job.roles.includes(role))
        state.filters.roles.includes(job.jobRole)
      );
    },
    setMinBasePay(state, action) {
      state.filters.minBasePay = action.payload;
      state.filteredJobs = state.jobs.filter((job) =>
        // TODO: need to fix this
        state.filters.minBasePay.includes(job.minJdSalary.toString())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
        console.log(action.payload);
        state.filteredJobs = action.payload;
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
