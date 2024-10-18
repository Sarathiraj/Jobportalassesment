import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

interface JobDetailsModalProps {
  open: boolean;
  onClose: () => void;
  Applicationdetails: any; // This should contain the jobId
}

const Appliedjob: React.FC<JobDetailsModalProps> = ({
  onClose,
  open,
  Applicationdetails,
}) => {
  const Appliedjobapplication = useSelector(
    (state: any) => state.Jobportal.applyjob
  );

  const applicationData = Appliedjobapplication.find(
    (app: any) => app.jobId === Applicationdetails?.companyId
  );

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex items-center flex-col gap-2">
          <CheckCircleIcon
            className="text-green-500 mr-2 h-6 w-6"
            fontSize="large"
          />
          <span className="text-2xl font-bold text-gray-800">
            Application Submitted
          </span>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold text-gray-800">Job Details</p>
          <div className="bg-white p-6 rounded-md shadow-lg border border-gray-300">
            {applicationData ? (
              <div key={applicationData?.jobId}>
                <h3 className="text-xl font-bold text-gray-800">
                  {applicationData.Jobtitle}
                </h3>
                <p className="text-md text-gray-600">
                  Company: {applicationData?.company}
                </p>
                <div className="mt-4">
                  <div className="flex flex-col mb-4">
                    <strong>First Name:</strong>
                    <p className="text-gray-700">
                      {applicationData?.firstName}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <strong>Last Name:</strong>
                    <p className="text-gray-700">{applicationData?.lastName}</p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <strong>Email:</strong>
                    <p className="text-gray-700">{applicationData?.email}</p>
                  </div>

                  <div className="flex flex-col mb-4">
                    <strong>About Me:</strong>
                    <div
                      className="border border-gray-300 rounded p-2 mt-1 bg-gray-50"
                      dangerouslySetInnerHTML={{
                        __html: applicationData?.aboutMe,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-500">No application details found.</p>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={() => window.print()} color="secondary">
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Appliedjob;
