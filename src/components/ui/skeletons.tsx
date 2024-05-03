import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Grid } from "@mui/material";
import { Box, Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  card: {
    overflow: "hidden",
    borderRadius: "1rem",
    maxWidth: "28rem",
    backgroundColor: "#ffffff",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  primaryHeadingText: {
    marginBottom: "0.5rem",
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    fontWeight: "bolder",
    width: "10rem", // Adjust as needed
    height: "1.75rem",
    backgroundColor: "#F3F4F6", // Mimic shimmer effect
    borderRadius: "0.25rem", // Mimic shimmer effect
  },
  secondaryText: {
    marginBottom: "1rem",
    color: "#4B5563",
    width: "15rem", // Adjust as needed
    height: "1rem", // Adjust as needed
    backgroundColor: "#F3F4F6", // Mimic shimmer effect
    borderRadius: "0.25rem", // Mimic shimmer effect
  },
  secondaryHeadingText: {
    marginBottom: "0.5rem",
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    fontWeight: "bold",
    width: "15rem", // Adjust as needed
    height: "1.75rem",
    backgroundColor: "#F3F4F6", // Mimic shimmer effect
    borderRadius: "0.25rem", // Mimic shimmer effect
  },
  button: {
    display: "flex",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.5rem",
    width: "100%",
    color: "#ffffff",
    backgroundColor: "#3B82F6",
    "&:hover": { backgroundColor: "#2563EB" },
    marginBottom: "1rem", // Adjust as needed
  },
  cardActions: {
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  shimmer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "1rem",
    maxWidth: "28rem",
    backgroundColor: "#F3F4F6",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(to right, transparent, white 60%, transparent)",
      animation: "$shimmer 2s infinite",
    },
  },
  "@keyframes shimmer": {
    "0%": { transform: "translateX(-100%)" },
    "100%": { transform: "translateX(100%)" },
  },
}));

const CardSkeleton = () => {
  const classes = useStyles();

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Box className={classes.shimmer}>
        <CardContent>
          <Box>
            <Typography
              variant='h6'
              className={classes.primaryHeadingText}
            ></Typography>
            <Box>
              <Typography
                variant='subtitle1'
                className={classes.primaryHeadingText}
              ></Typography>
              <Typography
                variant='body2'
                className={classes.secondaryText}
              ></Typography>
              <Typography
                variant='body2'
                className='text-xs text-gray-500'
              ></Typography>
            </Box>
          </Box>
          <Box className='flex justify-between text-sm mb-4'>
            <Typography variant='body2' className='text-green-500'></Typography>
            <Typography variant='body2' className='text-green-500'></Typography>
          </Box>
          <Box>
            <Typography className={classes.secondaryHeadingText}></Typography>
            <Typography variant='body2' className='text-sm'></Typography>
          </Box>
        </CardContent>
        <Box className={classes.cardActions}>
          {/* <Button
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Easy Apply
          </Button>
          <Button variant='outlined' color='primary' className={classes.button}>
            Unlock referral asks
          </Button> */}
        </Box>
      </Box>
    </Grid>
  );
};

export function CardsSkeleton() {
  return (
    <Grid
      container
      spacing={{ xs: 1, sm: 2, md: 3 }}
      columns={{ xs: 1, sm: 8, md: 12 }}
    >
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </Grid>
  );
}
