import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Modal from "../Components/Modal/Modaldialog";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Appliedjob from "../Components/Modal/Appliedjob";

interface Job {
  id: number;
  title: string;
  location: string;
  companyId: number;
  name: string;
  logo: string;
  description: string;
  jobs: Job[];
  experience: string;
  skillsRequired: any;
  jobDescription: string;
}

const Joblist: React.FC = () => {
  const appliedJobIds = useSelector((state: any) => state?.Jobportal?.applyjob);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedJobcompanydetails, setSelectedJobcompanydetails] =
    useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenapplication, setModalOpenapplication] = useState(false);

  const [Applicationdetails, setApplicationdetails] = useState<Job | null>(
    null
  );
  useEffect(() => {
    const fetchList = async () => {
      try {
        const result = await axios.get<Job[]>("http://localhost:3001/jobs");
        setJobList(result?.data);
        console.log(result?.data);
      } catch (error) {
        console.error("Error fetching job list", error);
      }
    };
    fetchList();
  }, []);

  const filteredJobs = jobList?.filter(
    (job: any) =>
      job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJobClick = (job: Job, company: Job) => {
    if (!appliedJobIds.some((res: any) => res?.jobId === job?.companyId)) {
      setSelectedJob(job);
      setSelectedJobcompanydetails(company);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };
  useEffect(() => {}, [dispatch]);
  const handleViewApplication = (job: Job) => {
    setApplicationdetails(job);
    setModalOpenapplication(true);
  };
  const handleViewApplicationclose = () => {
    setModalOpenapplication(false);
  };
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col p-4 pt-16 overflow-y-auto pl-10">
        <Header />
        <div className="flex flex-col gap-2 pt-3 pl-10">
          <label className="text-md font-bold text-gray-700">
            Search Your Dream Job
          </label>
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="mb-4 p-2 border border-gray-300 rounded w-48"
          />
        </div>

        <div className="flex flex-col w-full flex-wrap justify-around gap-4 p-4">
          {currentJobs?.map((company: any) => (
            <div
              className="flex border border-gray-300 hover:bg-gray-300 rounded-lg p-4 gap-4 w-full"
              key={company?.companyId}
              onClick={() => handleJobClick(company, company)}>
              <img
                src={company?.logo || "https://via.placeholder.com/100"}
                alt={`${company?.name} logo`}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-lg font-bold">{company?.name}</p>
                <p className="text-gray-600">{company?.description}</p>
                <div
                  key={company.id}
                  className="border-t border-gray-200 mt-2 pt-2 cursor-pointer">
                  <p className="font-semibold">{company?.title}</p>
                  <p className="font-semibold">{company?.experience}</p>
                  <p className="text-gray-500">{company?.location}</p>

                  <button
                    onClick={(e) => {
                      navigate("/Jobapplication", {
                        state: {
                          jobId: company?.companyId,
                          company: company?.name,
                          Jobtitle: company?.title,
                          JobExperience: company?.experience,
                          Joblocation: company?.location,
                          JobDescription: company?.jobDescription,
                        },
                      });
                      e.stopPropagation();
                    }}
                    className={`mt-2 p-1 pl-2 pr-2 rounded ${
                      appliedJobIds?.some(
                        (res: any) => res?.jobId === company?.companyId
                      )
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-gray-800 text-white"
                    }`}
                    disabled={appliedJobIds?.some(
                      (res: any) => res.jobId === company?.companyId
                    )}>
                    Apply
                  </button>

                  {appliedJobIds.some(
                    (res: any) => res?.jobId === company?.companyId
                  ) && (
                    <span
                      className="text-green-500 text-md font-bold cursor-pointer pl-5"
                      onClick={() => handleViewApplication(company)}>
                      Applied
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            className="mt-4"
          />
        </div>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          job={selectedJob}
          selectedJobcompanydetails={selectedJobcompanydetails}
        />
        <Appliedjob
          open={modalOpenapplication}
          onClose={handleViewApplicationclose}
          Applicationdetails={Applicationdetails}
        />
      </div>
    </div>
  );
};

export default Joblist;
