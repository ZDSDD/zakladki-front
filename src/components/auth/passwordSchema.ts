import * as Yup from 'yup';

const passwordSchema = Yup.string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .matches(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną wielką literę")
    .matches(/[a-z]/, "Hasło musi zawierać przynajmniej jedną małą literę")
    .matches(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę")
    .matches(/[^A-Za-z0-9]/, "Hasło musi zawierać przynajmniej jeden znak specjalny")
    .test('password-strength', 'Hasło jest zbyt słabe', function (value) {
        if (!value) return true; // Let required handle empty values

        let score = 0;
        if (value.length >= 8) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[a-z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        let strength = '';
        if (score === 5) strength = 'Bardzo silne';
        else if (score === 4) strength = 'Silne';
        else if (score === 3) strength = 'Umiarkowane';
        else if (score === 2) strength = 'Słabe';
        else strength = 'Bardzo słabe';

        // You can access this in your form component
        this.parent.passwordStrength = strength;

        // Consider the password valid if it's at least moderately strong
        return score >= 3;
    })
    .required("Hasło jest wymagane");


export default passwordSchema;
