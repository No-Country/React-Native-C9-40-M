import * as yup from 'yup';

export const schema = yup
  .object({
    email: yup.string().email('Email invalido').required('Requerido'),
    password: yup.string().required('Debe de indicar la clave'),
  })
  .required();
