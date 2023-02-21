import * as yup from 'yup';
import { regExp } from '../regExp';
export const schema = yup
  .object({
    email: yup.string().email('Email invalido').required('Obligatorio'),
    password: yup
      .string()
      .required('Obligatorio')
      .matches(
        regExp.password,
        'debe tener entre 4 y 8 caracteres al menos una Mayuscula y un numero'
      ),
    pwdConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Las claves no coinciden')
      .required('Obligatorio'),
  })
  .required();
