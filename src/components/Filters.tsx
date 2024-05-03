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
import { ChangeEvent } from "react";
import { FILTER_OPTIONS } from "../constants";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  grid: {
    padding: "2rem",
  },
}));

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getJobFilters);

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
    console.log({ selected });

    dispatch(setMinBasePay(selected));
  };

  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.grid} alignItems={"center"}>
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
        groupedSelect
        options={FILTER_OPTIONS.roles}
        selectedValues={filters.roles}
        onChange={handleRoleChange}
      />
      <MultipleSelectChip
        label='Min base pay'
        options={FILTER_OPTIONS.minBasePay.map((value) => `${value} Lakhs`)}
        selectedValues={filters.minBasePay}
        onChange={handleMinBasePayChange}
      />
      <TextField
        size='small'
        id='company-name'
        placeholder='Company Name'
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
