import { cyan } from "@material-ui/core/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Quicksand', sans-serif",
  },
  palette: {
    primary: {
      main: cyan["A200"],
    },
    secondary: {
      main: "#fff",
    },
  },
});

export default theme;
