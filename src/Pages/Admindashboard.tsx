import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addJob,
  editJob,
  deleteJob,
  setJobs,
} from "../State/Jobportal/JobportalSlice";

const AdminPanel: React.FC = () => {
  const dispatch = useDispatch();
  const jobList = useSelector((state: any) => state.Jobportal.jobList);

  const [jobForm, setJobForm] = useState<any>({
    id: "",
    companyId: 0,
    name: "",
    description: "",
    logo: "",
    title: "",
    location: "",
    experience: "",
    jobDescription: "",
    skillsRequired: [],
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await axios.get("http://localhost:3001/jobs");
        dispatch(setJobs(result.data));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobForm((prev: any) => ({
      ...prev,
      [name]:
        name === "skillsRequired"
          ? value.split(",").map((skill) => skill.trim())
          : name === "companyId"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobData = {
        ...jobForm,
        id: jobForm.id || String(Date.now() + Math.floor(Math.random() * 1000)),
      };

      if (jobForm.id) {
        const response = await axios.put(
          `http://localhost:3001/jobs/${jobForm.id}`,
          jobData
        );
        dispatch(editJob(response.data));
      } else {
        const response = await axios.post(
          "http://localhost:3001/jobs",
          jobData
        );
        dispatch(addJob(response.data));
      }
      resetForm();
    } catch (error: any) {
      console.error(
        "Error submitting job:",
        error?.response?.data || error.message
      );
    }
  };

  const resetForm = () => {
    setJobForm({
      id: "",
      title: "",
      location: "",
      companyId: 0,
      name: "",
      logo: "",
      description: "",
      experience: "",
      skillsRequired: [],
      jobDescription: "",
    });
  };

  const handleEdit = (job: any) => {
    setJobForm({
      ...job,
      companyId: Number(job.companyId),
      skillsRequired: Array.isArray(job?.skillsRequired)
        ? job.skillsRequired
        : [],
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/jobs/${id}`);
      dispatch(deleteJob(id));
    } catch (error: any) {
      console.error("Error deleting job:", error?.response || error?.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Admin Dashboard
      </h2>

      <div className="mb-6 p-4 bg-gray-100 shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Add Job</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={jobForm.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="location"
            value={jobForm.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="companyId"
            value={jobForm.companyId || ""}
            onChange={handleChange}
            placeholder="Company ID"
            required
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="name"
            value={jobForm.name}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="logo"
            value={jobForm.logo}
            onChange={handleChange}
            placeholder="Logo URL"
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={jobForm.description}
            onChange={handleChange}
            placeholder="Job Description"
            required
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="experience"
            value={jobForm.experience}
            onChange={handleChange}
            placeholder="Experience Required"
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="skillsRequired"
            value={jobForm.skillsRequired.join(", ") || ""}
            onChange={handleChange}
            placeholder="Skills Required (comma-separated)"
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="jobDescription"
            value={jobForm.jobDescription}
            onChange={handleChange}
            placeholder="Job Details"
            required
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-500 transition duration-200">
            {jobForm.id ? "Edit Job" : "Add Job"}
          </button>
        </form>
      </div>

      <div className="p-4 bg-gray-100 shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Existing Jobs</h3>
        <ul className="mt-4 space-y-2">
          {jobList.length === 0 ? (
            <li className="p-4 text-gray-500">No jobs available</li>
          ) : (
            jobList.map((job: any) => (
              <li
                key={job.id}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                <span className="font-medium text-gray-700">
                  {job.title} - {job.name}
                </span>
                <div>
                  <button
                    onClick={() => handleEdit(job)}
                    className="mr-2 p-2 bg-yellow-400 text-white rounded shadow hover:bg-yellow-300 transition duration-200">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-2 bg-red-600 text-white rounded shadow hover:bg-red-500 transition duration-200">
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
