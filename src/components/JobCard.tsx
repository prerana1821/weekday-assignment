import { Job } from "../types";
import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { Box, Typography } from "@mui/material";

interface Props {
  job: Job;
}

const usdToLakhs = (usd: number) => (usd * 83.38) / 100000;

const JobCard: React.FC<Props> = ({ job }) => {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card>
        <CardContent>
          <Box className='flex items-center mb-4'>
            {job.company}
            <Box>
              <Typography variant='subtitle1' className='font-semibold text-sm'>
                {job.jobRole}
              </Typography>
              <Typography variant='body2' className='text-xs text-gray-500'>
                {job.location}
              </Typography>
              <Typography variant='body2' className='text-xs text-gray-500'>
                {job.techStack.join(", ")}
              </Typography>
            </Box>
          </Box>
          <Box className='flex justify-between text-sm mb-4'>
            <Typography variant='body2' className='text-green-500'>
              ${usdToLakhs(job.minJdSalary)} - {usdToLakhs(job.maxJdSalary)}{" "}
              {job.salaryCurrencyCode}
            </Typography>
            <Typography variant='body2' className='text-green-500'>
              Experience {job.minExp} - {job.maxExp} years
            </Typography>
            <Typography variant='body2' className='text-gray-500'>
              Posted 10 days ago
            </Typography>
          </Box>
          <Box>
            <Typography
              variant='subtitle1'
              className='font-semibold text-lg mb-1'
            >
              About Company:
            </Typography>
            <Typography variant='body2' className='text-sm'>
              {job.jobDetailsFromCompany}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            className='py-2 px-4 rounded-full w-full mt-4 mb-2'
          >
            Easy Apply
          </Button>
          <Button
            variant='outlined'
            color='primary'
            className='text-green-700 font-semibold py-2 px-4 rounded-full w-full'
          >
            Unlock referral asks
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default JobCard;
