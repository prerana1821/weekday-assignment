import { Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  header: {
    position: "sticky",
    top: 0,
    padding: "0.5rem",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px -1px #0000001a",
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Typography variant='h4' fontSize={"x-large"}>
        👋 Prerana
      </Typography>
    </Box>
  );
};

export default Header;
