import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../components/JobCard";
import {
  fetchJobs,
  getFilteredJobs,
  getJobsError,
  getJobsStatus,
  selectAllJobs,
} from "../redux/jobSlice";
import { Job } from "../types";
import { AppDispatch } from "../redux/appStore";
import { Box, Grid } from "@mui/material";

const JobFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const jobs = useSelector(selectAllJobs);
  const filteredJobs = useSelector(getFilteredJobs);
  const status = useSelector(getJobsStatus);
  const error = useSelector(getJobsError);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchJobs());
    };

    fetchData();

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [dispatch]);

  const handleObserver: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting && status !== "loading") {
      dispatch(fetchJobs());
    }
  };

  return (
    <Box sx={{ m: 5 }}>
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {filteredJobs.map((job: Job) => (
          <JobCard key={job.jdUid} job={job} />
        ))}
      </Grid>
      <div id='observer' />
      {status === "loading" && <p>Loading...</p>}
    </Box>
  );
};

export default JobFeed;
