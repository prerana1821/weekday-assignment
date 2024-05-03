import { Dispatch } from "@reduxjs/toolkit";
import { FILTER_OPTIONS } from "../constants";
import {
  setCompanyName,
  setLocations,
  setMinBasePay,
  setMinExperience,
  setRemoteOnSite,
  setRoles,
  setTechStack,
} from "../redux/jobSlice";

type FilterKey = keyof typeof FILTER_OPTIONS | "companyName";

export const handleFilterChange = (
  filterKey: FilterKey,
  selected: string[],
  dispatch: Dispatch
) => {
  switch (filterKey) {
    case "companyName":
      dispatch(setCompanyName(selected[0]));
      break;
    case "minExperience":
      dispatch(setMinExperience(selected));
      break;
    case "locations":
      dispatch(setLocations(selected));
      break;
    case "remoteOnSite":
      dispatch(setRemoteOnSite(selected));
      break;
    case "techStack":
      dispatch(setTechStack(selected));
      break;
    case "roles":
      dispatch(setRoles(selected));
      break;
    case "minBasePay":
      dispatch(setMinBasePay(selected));
      break;
    default:
      break;
  }
};
