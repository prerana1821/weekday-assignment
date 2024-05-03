import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "0.5rem",
    margin: "0 3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialButton: {
    backgroundColor: "#edf2f7",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
