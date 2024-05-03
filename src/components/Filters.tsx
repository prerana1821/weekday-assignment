import { FC, ChangeEvent } from "react";
import { Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getJobFilters } from "../redux/jobSlice";
import MultipleSelectChip from "./ui/MultipleSelect";
import { FILTER_LABELS, FILTER_OPTIONS } from "../constants";
import { handleFilterChange } from "../utils/handleFilterChange";

const useStyles = makeStyles(() => ({
  grid: {
    padding: "2rem",
  },
}));

const Filters: FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getJobFilters);
  const classes = useStyles();

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
          handleFilterChange("companyName", [event.target.value], dispatch)
        }
      />
    </Grid>
  );
};

export default Filters;
