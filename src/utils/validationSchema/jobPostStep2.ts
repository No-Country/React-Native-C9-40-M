import * as yup from "yup";

export const schema = yup
  .object({
    job_country: yup.string().required("Debe de indicar el país"),
    job_region: yup.string().required("Debe de indicar la ciudad"),
  })
  .required();
