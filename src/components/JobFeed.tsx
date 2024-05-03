import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "./JobCard";
import {
  fetchJobs,
  getFilteredJobs,
  getJobsError,
  getJobsStatus,
} from "../redux/jobSlice";
import { Job } from "../types";
import { Box, Grid, Typography } from "@mui/material";
import { AppDispatch } from "../redux/appStore";
import { CardsSkeleton } from "./ui/skeletons";

const JobFeed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const filteredJobs = useSelector(getFilteredJobs);
  const status = useSelector(getJobsStatus);
  const error = useSelector(getJobsError);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && status !== "loading") {
            dispatch(fetchJobs());
          }
        },
        { threshold: 1 }
      );

      if (observerTarget.current) {
        observer.observe(observerTarget.current);
      }
    } catch (error) {
      console.error("Error initializing Intersection Observer:", error);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, status]);

  return (
    <Box sx={{ m: 5 }}>
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        justifyContent={"center"}
        gap={6}
      >
        {status === "failed" ? (
          <Typography variant='h5' align='center' color='error'>
            {error}
          </Typography>
        ) : filteredJobs.length === 0 ? (
          <Typography variant='h5' align='center'>
            No jobs found. Please try a different filter or search term.
          </Typography>
        ) : (
          filteredJobs.map((job: Job) => <JobCard key={job.jdUid} job={job} />)
        )}
      </Grid>
      <div ref={observerTarget}></div>
      {status === "loading" && <CardsSkeleton />}
    </Box>
  );
};

export default JobFeed;
