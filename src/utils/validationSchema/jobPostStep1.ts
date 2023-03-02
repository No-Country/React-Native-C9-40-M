import * as yup from "yup";
// validaciones paso 0

export const schema = yup
  .object({
    company_name: yup.string(""),
    job_desc: yup.string().required("Debe de dar la descripción del trabajo"),
    // job_work_place: yup
    //   .string()
    //   .required("Debe de indicar la Modalidad de Trabajo"),
  })
  .required();
