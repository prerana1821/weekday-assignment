import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./appStore";
import { Job, JobState } from "../types";
import { usdToInrInLakhs } from "../utils/textManipulations";
import { generateCompanyName } from "../utils/generateCompanyName";
import { generateTechStack } from "../utils/generateTechStack";

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
  currentPage: 1,
  totalJobs: 0,
};

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { getState }) => {
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
      throw error;
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setMinExperience(state, action) {
      state.filters.minExperience = action.payload;
      state.filteredJobs = state.jobs.filter((job) => {
        // TODO: min exp and greater
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

      state.filteredJobs = jobs.filter((job) => {
        let jobMinSalaryInLakhs: number;
        if (job.salaryCurrencyCode === "USD") {
          // Convert USD salary to INR lakhs
          jobMinSalaryInLakhs = usdToInrInLakhs(job.minJdSalary);
        } else if (job.salaryCurrencyCode === "INR") {
          jobMinSalaryInLakhs = job.minJdSalary / 100000; // Already in lakhs
        } else {
          // Handle other currencies if needed
          // For currencies other than USD and INR, you may need to define their respective conversion rates
          jobMinSalaryInLakhs = job.minJdSalary; // Assuming salary is already in lakhs for other currencies
        }
        return action.payload.some((minSalary: string) => {
          console.log({ jobMinSalaryInLakhs, minSalary });
          return jobMinSalaryInLakhs >= Number(minSalary.slice(0, 2));
        });
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
        state.jobs = [...state.jobs, ...action.payload.jobs];
        state.filteredJobs = [...state.filteredJobs, ...action.payload.jobs];
        state.totalJobs = action.payload.totalCount;
        state.currentPage++;

        if (Object.values(state.filters).some((filter) => filter.length > 0)) {
          //   TODO: If any filters are applied, keep applying the filters on new data as well
        }
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
