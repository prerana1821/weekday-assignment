import { makeStyles } from "@material-ui/core/styles";
import { cyan } from "@mui/material/colors";

const useStyles = makeStyles(() => ({
  header: {
    position: "sticky",
    top: 0,
    padding: "0.5rem 3.5rem",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px -1px #0000001a",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    overflowX: "hidden",
  },
  circularButton: {
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.2rem",
    backgroundColor: cyan["A200"],
    width: "35px",
    height: "35px",
  },
}));

export default useStyles;
