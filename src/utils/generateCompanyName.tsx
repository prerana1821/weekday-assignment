import { COMPANY_PREFIXES, COMPANY_SUFFIXES } from "../constants";

export const generateCompanyName = () => {
  const randomPrefix =
    COMPANY_PREFIXES[Math.floor(Math.random() * COMPANY_PREFIXES.length)];
  const randomSuffix =
    COMPANY_SUFFIXES[Math.floor(Math.random() * COMPANY_SUFFIXES.length)];

  return `${randomPrefix} ${randomSuffix}`;
};
