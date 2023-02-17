import * as yup from 'yup';

export const schema = yup
  .object({
    url_portfolio: yup
      .string()
      //   .url('no cumple con el formato')
      .required('Requerido'),
    gitUrl: yup
      .string()
      // .url('no cumple con el formato')
      .required('Requerido'),
    // nombre: yup.string().required('Requerido'),
    // apellido: yup.string().required("Requerido"),
    // pais: yup.string().required("Requerido"),
    // ciudad: yup.string().required("Requerido"),
    // telefono: yup.string().required("Requerido"),
  })
  .required();
