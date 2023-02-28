import * as yup from "yup";

export const schema = yup
  .object({
    job_country: yup.string().required("Debe de indicar el país"),
    job_region: yup.string().required("Debe de indicar la ciudad"),
    job_desc: yup.string().required("Debe de dar la descripción del trabajo"),
    // job_work_place: yup
    //   .string()
    //   .required("Debe de indicar la Modalidad de Trabajo"),
  })
  .required();
