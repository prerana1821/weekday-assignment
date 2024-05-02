import { TextField, Grid } from "@mui/material";
import MultipleSelectChip from "./MultipleSelect";
import {
  getJobFilters,
  setCompanyName,
  setLocations,
  setMinBasePay,
  setMinExperience,
  setRemoteOnSite,
  setRoles,
  setTechStack,
} from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { FILTER_OPTIONS } from "../constants";
import { fetchStatesInIndia } from "../services/fetchStatesInIndia";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getJobFilters);

  // const [statesInIndia, setStatesInIndia] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const states = await fetchStatesInIndia();
  //     setStatesInIndia(states);
  //   })();
  // }, []);

  const handleCompanyName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCompanyName(event.target.value));
  };

  const handleMinExperienceChange = (selected: string[]) => {
    dispatch(setMinExperience(selected));
  };

  const handleLocationChange = (selected: string[]) => {
    dispatch(setLocations(selected));
  };

  const handleRemoteOnSiteChange = (selected: string[]) => {
    dispatch(setRemoteOnSite(selected));
  };
  const handleTechStackChange = (selected: string[]) => {
    dispatch(setTechStack(selected));
  };

  const handleRoleChange = (selected: string[]) => {
    dispatch(setRoles(selected));
  };

  const handleMinBasePayChange = (selected: string[]) => {
    dispatch(setMinBasePay(selected));
  };

  return (
    <Grid container spacing={2}>
      <MultipleSelectChip
        label='Min experience'
        options={FILTER_OPTIONS.minExperience}
        selectedValues={filters.minExperience}
        onChange={handleMinExperienceChange}
      />
      <MultipleSelectChip
        label='Location'
        options={FILTER_OPTIONS.locations}
        selectedValues={filters.locations}
        onChange={handleLocationChange}
      />
      <MultipleSelectChip
        label='Remote/On-site'
        options={FILTER_OPTIONS.remoteOnSite}
        selectedValues={filters.remoteOnSite}
        onChange={handleRemoteOnSiteChange}
      />
      <MultipleSelectChip
        label='Tech Stack'
        options={FILTER_OPTIONS.techStack}
        selectedValues={filters.techStack}
        onChange={handleTechStackChange}
      />
      <MultipleSelectChip
        label='Role'
        options={FILTER_OPTIONS.roles}
        selectedValues={filters.roles}
        onChange={handleRoleChange}
      />
      <MultipleSelectChip
        label='Min base pay'
        options={FILTER_OPTIONS.minBasePay}
        selectedValues={filters.minBasePay}
        onChange={handleMinBasePayChange}
      />
      <TextField
        id='outlined-basic'
        label='Outlined'
        variant='outlined'
        value={filters.companyName}
        onChange={handleCompanyName}
      />
    </Grid>
  );
};

export default Filters;

// TODO:
// Debounce the Search Input
// Memoization for Filtering:
// Optimize Redux State Updates
// testing
