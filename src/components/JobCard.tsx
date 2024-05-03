import { useState } from "react";
import { Job } from "../types";
import { Grid } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { usdToInrInLakhs } from "../utils/textManipulations";
import { Button } from "@material-ui/core";
interface Props {
  job: Job;
}

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: "1rem",
    maxWidth: "28rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    margin: "2rem",
    padding: "1rem",
  },
}));

const JobCard: React.FC<Props> = ({ job }) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Grid
      item
      xs={1}
      sm={2}
      md={3}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        transition: "transform 0.3s ease-in-out",
        transform: isHovered ? "scale(1.02)" : "scale(1)",
        width: "28rem",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        margin: "1rem",
        padding: "1rem",
      }}
      className={classes.card}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box
          sx={{
            width: "40px",
            height: "40px",
            fontWeight: "bolder",
            fontSize: "xx-large",
            backgroundColor: "#f50057",
            borderRadius: "50%",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {job.company.charAt(0)}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              color: "grey",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {job.company}
          </Typography>
          <Typography
            mt={0.5}
            sx={{ fontSize: 14, textTransform: "capitalize" }}
          >
            {job?.jobRole}
          </Typography>
          <Typography
            mt={0.5}
            sx={{ fontSize: 12, textTransform: "capitalize" }}
          >
            {job?.location}
          </Typography>
        </Box>
      </Box>
      <Typography mt={1} sx={{ color: "grey", fontSize: 16 }}>
        Estimated Salary: &#x20B9;{usdToInrInLakhs(job.minJdSalary)} -{" "}
        {usdToInrInLakhs(job.maxJdSalary)} LPA &#x2705;
      </Typography>

      <Typography mt={1} variant='body2' sx={{ fontSize: 16, fontWeight: 500 }}>
        About Company:
      </Typography>

      <Typography
        mt={0.2}
        variant='body2'
        sx={{ fontSize: 14, fontWeight: 700 }}
      >
        About us
      </Typography>

      <Box
        sx={{
          maskImage: showMore
            ? ""
            : "linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))",
        }}
      >
        <Typography mt={0.5} sx={{ fontSize: 16, fontWeight: 400 }}>
          {job?.jobDetailsFromCompany
            ? showMore
              ? job?.jobDetailsFromCompany
              : job?.jobDetailsFromCompany?.slice(0, 400)
            : " "}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          bottom: 20,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          sx={{ color: "blue", cursor: "pointer", fontSize: 14 }}
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Show Less" : "View Job"}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            color: "grey",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          Minimum Experience
        </Typography>

        <Typography mt={0.5} variant='body2' sx={{ fontSize: 14 }}>
          {job?.minExp ? `${job?.minExp} Years ` : "NA"}
        </Typography>
      </Box>
      <Box
        mt={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexDirection: "column",
        }}
      >
        <Button
          onClick={() => window.open(job?.jdLink)}
          style={{
            padding: "1rem 2rem",
            border: "0px",
            width: "100%",
            borderRadius: "0.5rem",
            background: "rgb(85, 239, 196)",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: 1,
            textTransform: "capitalize",
            cursor: "pointer",
          }}
        >
          ⚡ Easy Apply
        </Button>
        <Button
          onClick={() => window.open(job?.jdLink)}
          style={{
            padding: "1rem 2rem",
            border: "0px",
            width: "100%",
            borderRadius: "0.5rem",
            background: "#1976D2",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: 1,
            cursor: "pointer",
            textTransform: "capitalize",
          }}
        >
          Unlock Referral Asks
        </Button>
      </Box>
    </Grid>
  );
};

export default JobCard;
