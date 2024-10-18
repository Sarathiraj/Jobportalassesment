import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
interface Job {
  skillsRequired: any;
  id: number;
  title: string;
  location: string;
  companyId: number;
  name: string;
  logo: string;
  description: string;
  experience: string;
  jobDescription: string;
}

interface JobDetailsModalProps {
  open: boolean;
  onClose: () => void;
  job: Job | null;
  selectedJobcompanydetails: Job | null;
}
const Modal: React.FC<JobDetailsModalProps> = ({
  open,
  onClose,
  job,
  selectedJobcompanydetails,
}) => {
  const navigate = useNavigate();
  if (!job) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <div className="flex items-end justify-end pr-3 ">
          <button
            onClick={onClose}
            color="primary"
            className="mt-2 p-1 bg-gray-300 border w-8 border-gray-200 rounded-full hover:bg-gray-400 transition duration-200">
            X
          </button>
        </div>

        <DialogTitle className="flex items-center justify-center flex-col">
          <img
            src={selectedJobcompanydetails?.logo}
            className="w-16 h-16 rounded-full"
          />
          <p className="text-m  d font-bold ">
            {selectedJobcompanydetails?.name}
          </p>
        </DialogTitle>
        <DialogContent>
          <p>
            <strong className="text-md font-bold">Job Title:</strong>{" "}
            {job.title}
          </p>
          <p>
            <strong className="text-md font-bold">Location:</strong>{" "}
            {job.location}
          </p>
          <p>
            <strong className="text-md font-bold">Experience Required:</strong>{" "}
            {job.experience}
          </p>
          <br></br>
          <p>
            <strong className="text-md font-bold">Skills Required:</strong>
          </p>
          <ul>
            {job.skillsRequired.map((skill: any, index: any) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <br></br>
          <p>
            <strong className="text-md font-bold">Job Description : </strong>{" "}
            {job?.jobDescription}
          </p>
        </DialogContent>
        <div className="flex  justify-center space-x-4 pb-3 pt-2">
          <button
            onClick={(e) => {
              navigate("/Jobapplication", {
                state: {
                  jobId: job?.id,
                  company: selectedJobcompanydetails?.name,
                  Jobtitle: job?.title,
                  JobExperience: job?.experience,
                  Joblocation: job?.location,
                  JobDescription: selectedJobcompanydetails?.jobDescription,
                },
              });
              e.stopPropagation();
            }}
            className="mt-2 p-1 pl-2 pr-2 bg-gray-800 text-white rounded">
            Apply for Job
          </button>
        </div>
      </Dialog>
    </>
  );
};
export default Modal;
