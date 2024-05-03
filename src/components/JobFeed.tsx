import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "./JobCard";
import {
  fetchJobs,
  getFilteredJobs,
  getJobsError,
  getJobsStatus,
} from "../redux/jobSlice";
import { Job } from "../types";
import { Box, Grid } from "@mui/material";
import { AppDispatch } from "../redux/appStore";
import { CardsSkeleton } from "./skeletons";

const JobFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const filteredJobs = useSelector(getFilteredJobs);
  const status = useSelector(getJobsStatus);
  const error = useSelector(getJobsError);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
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

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    <Box sx={{ m: 5 }}>
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        justifyContent={"center"}
        gap={6}
      >
        {filteredJobs.map((job: Job) => (
          <JobCard key={job.jdUid} job={job} />
        ))}
      </Grid>
      <div ref={observerTarget}></div>
      {status === "loading" && <CardsSkeleton />}
      {status === "failed" && <p>{error}</p>}
    </Box>
  );
};

export default JobFeed;
