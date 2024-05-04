import { FILTER_OPTIONS } from "./constants";

export interface Job {
  jdUid: string;
  jdLink: string;
  location: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
  minExp: number;
  maxExp: number;
  jobRole: string;
  company: string;
  techStack: string[];
}

export interface JobState {
  jobs: Job[];
  filteredJobs: Job[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error?: string;
  filters: JobFilters;
  currentPage: number;
  totalJobs: number;
}

export interface JobFilters {
  minExperience: string[];
  companyName: string;
  locations: string[];
  remoteOnSite: string[];
  techStack: string[];
  roles: string[];
  minBasePay: string[];
}

export type FilterKey = keyof typeof FILTER_OPTIONS | "companyName";
