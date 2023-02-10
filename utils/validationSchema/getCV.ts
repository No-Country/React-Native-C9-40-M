import * as yup from 'yup';

export const schema = yup
  .object({
    linkedInUrl: yup
      .string()
      // .url('no cumple con el formato')
      .required('Requerido'),
    gitUrl: yup
      .string()
      // .url('no cumple con el formato')
      .required('Requerido'),
  })
  .required();
