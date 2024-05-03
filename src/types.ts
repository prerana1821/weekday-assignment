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
  filters: {
    minExperience: string[];
    companyName: string;
    locations: string[];
    remoteOnSite: string[];
    techStack: string[];
    roles: string[];
    minBasePay: string[];
  };
  currentPage: number;
  totalJobs: number;
}
