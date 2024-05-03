import { Dispatch, SetStateAction } from "react";
import useStyles from "./Modal.styles";
import { Job } from "../../../types";
import { Typography } from "@mui/material";
import { titleCase, usdToInrInLakhs } from "../../../utils/textManipulations";

export default function Modal({
  setShowModal,
  job,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  job: Job;
}) {
  const classes = useStyles();

  return (
    <div className={classes.fullScreen} onClick={() => setShowModal(false)}>
      <div
        className={classes.modalContainer}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={classes.modalHeader}>
          <Typography variant='h5'>Job Details</Typography>
        </div>
        <div className={classes.modalHeader}>
          <div>
            <Typography variant='body1'>
              <strong>Company:</strong> {job.company}
            </Typography>
            <Typography variant='body1'>
              <strong>Description:</strong> {job.jobDetailsFromCompany}
            </Typography>
            <Typography variant='body1'>
              <strong>Skills:</strong> {titleCase(job.techStack.join(", "))}
            </Typography>
            <Typography variant='body1'>
              <strong>Position:</strong> {titleCase(job.jobRole)}
            </Typography>
            <Typography variant='body1'>
              <strong>Location:</strong> {titleCase(job.location)}
            </Typography>
            <Typography variant='body1'>
              <strong>Experience:</strong> {job.minExp} - {job.maxExp} Years
            </Typography>
            <Typography variant='body1'>
              <strong>Estimated Salary:</strong> ₹
              {usdToInrInLakhs(job.minJdSalary)} -{" "}
              {usdToInrInLakhs(job.maxJdSalary)} LPA
            </Typography>
          </div>
        </div>
        <div className={classes.modalFooter}>
          <button
            className='button'
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
}
