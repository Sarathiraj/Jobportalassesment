import * as Yup from "yup";

export const applicationValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Must be Valid email")
    .required("email is required"),
  aboutMe: Yup.string()
    .required("About Me is required")
    .max(500, "Must be 500 characters or less"),
  skills: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string().required("Skill value is required"),
        label: Yup.string().required("Skill label is required"),
      })
    )
    .min(1, "At least one skill is required"),
});
