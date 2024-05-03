import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./appStore";
import { Job } from "../types";
import axios from "axios";
import { FILTER_OPTIONS } from "../constants";

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

function generateTechStack() {
  // TODO: no repeatative tech
  const selectedTechStack = [];
  const numElements = Math.floor(Math.random() * 2) + 3; // Select 3 or 4 elements
  for (let i = 0; i < numElements; i++) {
    const randomIndex = Math.floor(
      Math.random() * FILTER_OPTIONS.techStack.length
    );
    selectedTechStack.push(FILTER_OPTIONS.techStack[randomIndex]);
  }
  return selectedTechStack;
}

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
    return {
      ...data,
      company: generateCompanyName(),
      techStack: generateTechStack(),
    };
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
      state.filteredJobs = state.jobs.filter((job) =>
        state.filters.locations.includes(job.location.toLowerCase())
      );
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setRemoteOnSite(state, action) {
      state.filters.remoteOnSite = action.payload;
      state.filteredJobs = state.jobs.filter((job) =>
        state.filters.remoteOnSite.includes(job.location.toLowerCase())
      );
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setTechStack(state, action) {
      const { jobs } = state;
      const { payload } = action;

      state.filters.techStack = payload;

      state.filteredJobs = jobs.filter((job) => {
        return payload.every((tech: string) =>
          job.techStack.includes(tech.toLowerCase())
        );
      });

      if (payload.length === 0) {
        state.filteredJobs = jobs;
      }
    },
    setRoles(state, action) {
      state.filters.roles = action.payload;
      state.filteredJobs = state.jobs.filter((job) =>
        state.filters.roles.includes(job.jobRole.toLowerCase())
      );
      if (action.payload.length === 0) {
        state.filteredJobs = state.jobs;
      }
    },
    setMinBasePay(state, action) {
      const { jobs } = state;
      const { payload } = action;

      state.filters.minBasePay = action.payload;

      // TODO: need to fix this
      // Convert USD to lakhs using the exchange rate
      const usdToLakhs = (usd: number) => (usd * 83.38) / 100000;

      state.filteredJobs = jobs.filter((job) => {
        let jobMinSalaryInLakhs: number;
        if (job.salaryCurrencyCode === "USD") {
          jobMinSalaryInLakhs = usdToLakhs(job.minJdSalary);
        } else if (job.salaryCurrencyCode === "INR") {
          jobMinSalaryInLakhs = job.minJdSalary / 100000;
        } else {
          // Handle other currencies if needed
          // For currencies other than USD and INR, you may need to define their respective conversion rates
          jobMinSalaryInLakhs = job.minJdSalary; // Assuming salary is already in lakhs for other currencies
        }

        return action.payload.some(
          (minSalary: number) => jobMinSalaryInLakhs >= minSalary
        );
      });

      if (payload.length === 0) {
        state.filteredJobs = jobs;
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
