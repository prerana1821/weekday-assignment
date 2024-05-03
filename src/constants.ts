export const MINIMUM_BASE_PAY = Array.from({ length: 10 }, (_, i) =>
  (i + 1).toString()
);

export const JOB_ROLES = [
  {
    title: "Engineering",
    list: [
      "backend",
      "frontend",
      "fullstack",
      "ios",
      "flutter",
      "react native",
      "android",
    ],
  },
  {
    title: "Design",
    list: [
      "designer",
      "design manager",
      "graphic designer",
      "product designer",
    ],
  },
  {
    title: "Product",
    list: ["product manager"],
  },
];

export const TECH_STACK = [
  "python",
  "java",
  "golang",
  "ruby/rails",
  "c++",
  "kotlin",
  "django",
  "c#",
  "graphql",
  "flask",
  "typescript",
  "aws",
  "javascript",
  "rust",
  "nodeJS",
  "react",
];

export const MINIMUM_EXPERIENCE = Array.from({ length: 10 }, (_, i) =>
  (i + 1).toString()
);

export const REMOTE_ONSITE = ["remote", "hybrid", "in-office"];

export const LOCATIONS = [
  "mumbai",
  "delhi ncr",
  "chennai",
  "bangalore",
  "hyderabad",
];

export const FILTER_OPTIONS = {
  minExperience: MINIMUM_EXPERIENCE,
  locations: LOCATIONS,
  remoteOnSite: REMOTE_ONSITE,
  techStack: TECH_STACK,
  roles: JOB_ROLES,
  minBasePay: MINIMUM_BASE_PAY,
};

export const FILTER_LABELS = {
  minExperience: "Experience",
  locations: "Locations",
  remoteOnSite: "Work Mode",
  techStack: "Tech Stack",
  roles: "Job Roles",
  minBasePay: "Minimum Salary",
};

export const COMPANY_PREFIXES = [
  "ABC",
  "XYZ",
  "Tech",
  "Global",
  "Innovative",
  "Acme",
  "Dynamic",
  "Blue",
  "Red",
];
export const COMPANY_SUFFIXES = [
  "Corp",
  "Ltd",
  "Inc",
  "Services",
  "Solutions",
  "Enterprises",
  "Group",
  "Industries",
  "Partners",
];
