import React, { useState } from "react";
import { useFormik } from "formik";
import { applicationValidationSchema } from "../Components/validationSchema";
import Input from "../Components/Input";
import Select from "react-select";
import JobSuccess from "../Components/Modal/JobSuccess";
import Header from "../Components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setapplyjob } from "../State/Jobportal/JobportalSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface Job {
  title: string;
  description: string;
}

interface ApplicationFormProps {
  onClose: () => void;
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    email: string;
    aboutMe: string;
    skills: { value: string; label: string }[];
  }) => void;
  job: Job | null;
}

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    jobId,
    company,
    Jobtitle,
    JobExperience,
    Joblocation,
    JobDescription,
  } = location.state;

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      aboutMe: "",
      skills: [],
    },
    validationSchema: applicationValidationSchema,
    onSubmit: (values) => {
      setIsSuccessModalOpen(true);

      console.log(values, "values");
      dispatch(
        setapplyjob({
          jobId: jobId,
          company: company,

          Jobtitle: Jobtitle,
          JobExperience: JobExperience,
          Joblocation: Joblocation,
          JobDescription: JobDescription,
          firstName: values?.firstName,
          lastName: values?.lastName,
          email: values?.email,
          aboutMe: values?.aboutMe,
          skills: values?.skills,
        })
      );
    },
  });
  const skillsOptions: any = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "go", label: "Go" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "sql", label: "SQL" },
    { value: "r", label: "R" },
    { value: "rust", label: "Rust" },
    { value: "dart", label: "Dart" },
    { value: "scala", label: "Scala" },
    { value: "angular", label: "Angular" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "nodejs", label: "Node.js" },
    { value: "express", label: "Express" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "spring", label: "Spring" },
    { value: "mongodb", label: "MongoDB" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "aws", label: "AWS" },
    { value: "docker", label: "Docker" },
    { value: "kubernetes", label: "Kubernetes" },
    { value: "data-science", label: "Data Science" },
    { value: "data-analysis", label: "Data Analysis" },
    { value: "hr", label: "Human Resources" },
    { value: "fullstack", label: "Full Stack Development" },
    { value: "frontend", label: "Frontend Development" },
    { value: "backend", label: "Backend Development" },
  ];

  const handleSkillsChange = (selectedOptions: any) => {
    formik.setFieldValue("skills", selectedOptions);
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  return (
    <div className="flex-1 flex flex-col p-4 pt-10 overflow-y-auto pl-10">
      <form
        className="flex flex-col mx-auto max-w-md"
        onSubmit={formik.handleSubmit}>
        <p className="text-2xl font-bold  flex justify-center pt-5 pb-3 text-gray-800">
          Job Application Form
        </p>
        <p>
          <strong className="text-gray-600">
            Please Fill Out the Form Below to Submit Your Job Application!
          </strong>
        </p>
        <br></br>
        <div className="flex justify-between mb-4">
          <div className="flex-1 mr-2">
            <label>First Name:</label>
            <Input
              name="firstName"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.firstName}
              className={`border rounded p-2 ${
                formik?.touched?.firstName && formik?.errors?.firstName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik?.touched?.firstName && formik?.errors?.firstName && (
              <div className="text-red-500">{formik?.errors?.firstName}</div>
            )}
          </div>
          <div className="flex-1 ml-2">
            <label>Last Name:</label>
            <Input
              name="lastName"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.lastName}
              className={`border rounded p-2 ${
                formik?.touched?.lastName && formik?.errors?.lastName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik?.touched?.lastName && formik?.errors?.lastName && (
              <div className="text-red-500">{formik?.errors?.lastName}</div>
            )}
          </div>
        </div>

        <label>Email:</label>
        <Input
          name="email"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values?.email}
          className={`border rounded p-2 mb-4 ${
            formik?.touched?.email && formik?.errors?.email
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik?.touched?.email && formik?.errors?.email && (
          <div className="text-red-500">{formik?.errors?.email}</div>
        )}
        <label>Skills:</label>
        <Select
          isMulti
          options={skillsOptions}
          value={formik?.values?.skills}
          onChange={handleSkillsChange}
          placeholder="Select skills..."
          isSearchable
        />
        {formik?.errors?.skills && (
          <div className="text-red-500">{formik?.errors?.skills}</div>
        )}

        <label>About Me:</label>
        <ReactQuill
          theme="snow"
          value={formik?.values?.aboutMe}
          onChange={(value) => formik.setFieldValue("aboutMe", value)}
          modules={modules}
          onBlur={() => formik.setFieldTouched("aboutMe", true)} // Mark as touched
          className={`border border-gray-300 rounded mb-4`}
        />
        {formik?.touched?.aboutMe && formik?.errors?.aboutMe && (
          <div className="text-red-500">{formik?.errors?.aboutMe}</div>
        )}

        <div className="flex justify-between">
          <button
            type="submit"
            className="mt-4 p-2 bg-gray-800 text-white rounded-full flex-1 mr-2">
            Apply
          </button>
          <button
            onClick={() => navigate("/")}
            type="button"
            className="mt-4 p-2 border-gray-300 rounded-full flex-1 ml-2">
            Cancel
          </button>
        </div>
      </form>

      {isSuccessModalOpen && (
        <JobSuccess onClose={() => setIsSuccessModalOpen(false)} />
      )}
    </div>
  );
};

export default ApplicationForm;
