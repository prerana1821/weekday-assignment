import { Job } from "../types";
import { Button, CardContent, Grid } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { titleCase, usdToInrInLakhs } from "../utils/stringManipulations";
interface Props {
  job: Job;
}

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
  },
  secondaryText: { marginBottom: "1rem", color: "#4B5563" },
  secondaryHeadingText: {
    marginBottom: "0.5rem",
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    fontWeight: "bold",
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
    ":hover": { backgroundColor: "#2563EB" },
  },
  cardActions: {
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
}));

const JobCard: React.FC<Props> = ({ job }) => {
  const classes = useStyles();

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Box className={classes.card}>
        <CardContent>
          <Box>
            <Typography variant='h6' className={classes.primaryHeadingText}>
              {job.company}
            </Typography>
            <Box>
              <Typography
                variant='subtitle1'
                className={classes.primaryHeadingText}
              >
                {job.jobRole}
              </Typography>
              <Typography variant='body2' className={classes.secondaryText}>
                {titleCase(job.location)}
              </Typography>
              <Typography variant='body2' className='text-xs text-gray-500'>
                {job.techStack.join(", ")}
              </Typography>
            </Box>
          </Box>
          <Box className='flex justify-between text-sm mb-4'>
            <Typography variant='body2' className='text-green-500'>
              Estimated Salary: ₹{usdToInrInLakhs(job.minJdSalary)} -{" "}
              {usdToInrInLakhs(job.maxJdSalary)} LPA
            </Typography>
            <Typography variant='body2' className='text-green-500'>
              Minimum Experience {job.minExp} years
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.secondaryHeadingText}>
              About Company:
            </Typography>
            <Typography variant='body2' className='text-sm'>
              {job.jobDetailsFromCompany}
            </Typography>
          </Box>
        </CardContent>
        <Box className={classes.cardActions}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Easy Apply
          </Button>
          <Button variant='outlined' color='primary' className={classes.button}>
            Unlock referral asks
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default JobCard;
