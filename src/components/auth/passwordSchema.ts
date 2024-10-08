import * as Yup from 'yup';

const passwordSchema = Yup.string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .matches(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną wielką literę")
    .matches(/[a-z]/, "Hasło musi zawierać przynajmniej jedną małą literę")
    .matches(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę")
    .matches(/[^A-Za-z0-9]/, "Hasło musi zawierać przynajmniej jeden znak specjalny")
    .required("Hasło jest wymagane");

export default passwordSchema;
