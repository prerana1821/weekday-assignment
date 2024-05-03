import { FC, ChangeEvent, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getJobFilters } from "../redux/jobSlice";
import MultipleSelectChip from "./ui/MultipleSelect";
import { FILTER_LABELS, FILTER_OPTIONS } from "../constants";
import { handleFilterChange } from "../utils/handleFilterChange";
import useDebounce from "../hooks/useDebounce";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { FilterKey } from "../types";

const useStyles = makeStyles(() => ({
  grid: {
    padding: "2rem",
  },
}));

const Filters: FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getJobFilters);
  const classes = useStyles();
  const location = useLocation();
  const debouncedValue = useDebounce({
    value: filters.companyName,
    delay: 300,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   if (searchParams.get("companyName")) {
  //     dispatch(
  //       setCompanyName({
  //         value: searchParams.get("companyName"),
  //         debouncedValue,
  //       })
  //     );
  //   }

  //   if (searchParams.get("locations")) {
  //     dispatch(setLocations(searchParams.getAll("locations")));
  //   }
  //   if (searchParams.get("minBasePay")) {
  //     dispatch(setMinBasePay(searchParams.getAll("minBasePay")));
  //   }
  //   if (searchParams.get("minExperience")) {
  //     dispatch(setMinExperience(searchParams.getAll("minExperience")));
  //   }
  //   if (searchParams.get("remoteOnSite")) {
  //     dispatch(setRemoteOnSite(searchParams.getAll("remoteOnSite")));
  //   }
  //   if (searchParams.get("roles")) {
  //     dispatch(setRoles(searchParams.getAll("roles")));
  //   }
  //   if (searchParams.get("techStack")) {
  //     dispatch(setTechStack(searchParams.getAll("techStack")));
  //   }
  // }, [location.search]);

  useEffect(() => {
    [...Object.keys(FILTER_LABELS), "companyName"].forEach((key) => {
      const value = searchParams.getAll(key);
      if (value.length > 0) {
        handleFilterChange(key as FilterKey, value, dispatch, debouncedValue);
      }
    });
  }, [location.search]);

  useEffect(() => {
    const queryParams = queryString.stringify(filters);
    setSearchParams(queryParams);
  }, [filters]);

  return (
    <Grid
      container
      spacing={2}
      className={classes.grid}
      alignItems='center'
      justifyContent='center'
    >
      {Object.entries({ ...FILTER_OPTIONS }).map(([filterKey, options]) => {
        return (
          <MultipleSelectChip
            key={filterKey}
            label={FILTER_LABELS[filterKey as keyof typeof FILTER_OPTIONS]}
            groupedSelect={filterKey === "roles"}
            options={
              filterKey === "minBasePay"
                ? options.map((option) => `${option} Lakhs`)
                : options
            }
            selectedValues={
              filters[filterKey as keyof typeof filters] as string[]
            }
            onChange={(selected) =>
              handleFilterChange(
                filterKey as keyof typeof filters,
                selected,
                dispatch
              )
            }
          />
        );
      })}
      <TextField
        size='small'
        id='company-name'
        placeholder='Company Name'
        variant='outlined'
        value={filters.companyName}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleFilterChange(
            "companyName",
            [event.target.value],
            dispatch,
            debouncedValue
          )
        }
      />
    </Grid>
  );
};

export default Filters;
