import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CancelIcon from "@material-ui/icons/Cancel";
import { ListSubheader } from "@mui/material";
import { titleCase } from "../../utils/textManipulations";
import { makeStyles } from "@material-ui/core/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 180,
    },
  },
};

const useStyles = makeStyles({
  paper: {
    overflowX: "scroll",
    width: "180px",
  },
});

function getStyles(
  option: string,
  options: readonly (string | { title: string; list: string[] })[],
  theme: Theme
) {
  for (const item of options) {
    if (typeof item === "string") {
      if (item === option) {
        return {
          fontWeight: theme.typography.fontWeightMedium,
        };
      }
    } else {
      if ("options" in item && item.list.includes(option)) {
        return {
          fontWeight: theme.typography.fontWeightMedium,
        };
      }
    }
  }
  return {
    fontWeight: theme.typography.fontWeightRegular,
  };
}

interface Props {
  label: string;
  groupedSelect?: boolean;
  options: string[] | { title: string; list: string[] }[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

const MultipleSelectChip: React.FC<Props> = ({
  label,
  groupedSelect,
  options,
  selectedValues,
  onChange,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const { value } = event.target;
    onChange(Array.isArray(value) ? value : []);
  };

  const handleDelete = (value: string) => {
    onChange(selectedValues.filter((name) => name !== value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 180 }} size='small'>
      <InputLabel id={`demo-multiple-chip-label-${label}`}>{label}</InputLabel>
      <Select
        sx={{ overflowX: "auto" }}
        labelId={`demo-multiple-chip-label-${label}`}
        id={`demo-multiple-chip-${label}`}
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={
          <OutlinedInput
            sx={{ overflowX: "auto" }}
            id={`select-multiple-chip-${label}`}
            label={label.toUpperCase()}
          />
        }
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              overflowX: "auto",
            }}
          >
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                clickable
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
                onDelete={() => handleDelete(value)}
                onClick={() => console.log("clicked chip")}
              />
            ))}
          </Box>
        )}
        MenuProps={{
          ...MenuProps,
          classes: {
            paper: classes.paper,
          },
        }}
      >
        {groupedSelect
          ? (options as { title: string; list: string[] }[]).flatMap(
              (group) => [
                <ListSubheader key={group.title}>{group.title}</ListSubheader>,
                ...group.list.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                    style={getStyles(item, options, theme)}
                  >
                    {titleCase(item)}
                  </MenuItem>
                )),
              ]
            )
          : (options as string[]).map((option) => (
              <MenuItem
                key={option}
                value={option}
                style={getStyles(option, options, theme)}
              >
                {titleCase(option)}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectChip;
