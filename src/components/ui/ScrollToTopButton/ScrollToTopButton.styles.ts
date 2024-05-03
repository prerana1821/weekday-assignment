import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  iconButton: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    backgroundColor: "primary.main",
    color: "white",
    "&:hover": {
      backgroundColor: "primary.dark",
    },
  },
});

export default useStyles;
