import { usdToInrInLakhs } from "../utils/textManipulations";
import { Job, JobFilters, JobState } from "../types";

export const initialJobState: JobState = {
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

export const applyFilters = (jobs: Job[], filters: JobFilters) => {
  const {
    minExperience,
    companyName,
    locations,
    remoteOnSite,
    techStack,
    roles,
    minBasePay,
  } = filters;

  let filteredJobs = jobs;

  if (minExperience.length > 0) {
    filteredJobs = filteredJobs.filter((job) => {
      const minExp = job.minExp || 0;
      return minExperience.some(
        (selectedExp) => minExp >= parseInt(selectedExp)
      );
    });
  }

  if (companyName.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      job.company.toLowerCase().includes(companyName.toLowerCase())
    );
  }

  if (locations.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      locations.includes(job.location.toLowerCase())
    );
  }

  if (remoteOnSite.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      remoteOnSite.includes(job.location.toLowerCase())
    );
  }

  if (techStack.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      techStack.every((tech) => job.techStack.includes(tech.toLowerCase()))
    );
  }

  if (roles.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      roles.includes(job.jobRole.toLowerCase())
    );
  }

  if (minBasePay.length > 0) {
    filteredJobs = filteredJobs.filter((job) => {
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
      return minBasePay.some(
        (minSalary: string) =>
          jobMinSalaryInLakhs >= Number(minSalary.slice(0, 1))
      );
    });
  }

  return filteredJobs;
};
