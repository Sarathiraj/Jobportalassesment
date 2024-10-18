import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
interface JobDetailsModalProps {
  onClose: () => void;
}

const JobSuccess: React.FC<JobDetailsModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      navigate("/");
    }, 5000);
  });
  return (
    <>
      <Dialog open onClose={onClose}>
        <DialogTitle>
          <div className="flex items-center flex-col gap-2">
            <CheckCircleIcon
              className="text-green-500 mr-2 h-6 w-6"
              fontSize="large"
            />
            <span className="text-2xl font-bold text-gray-800">Good Job!</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <p className="text-md font-bold text-gray-600">
            Your application has been submitted successfully.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobSuccess;
