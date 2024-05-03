import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 180,
    },
  },
};

export const useStyles = makeStyles({
  paper: {
    overflowX: "scroll",
    width: "180px",
  },
});

export const getStyles = (
  option: string,
  options: readonly (string | { title: string; list: string[] })[],
  theme: Theme
) => {
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
};
