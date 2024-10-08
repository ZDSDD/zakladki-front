import * as Yup from 'yup';

// Define password rules in a reusable object
const passwordRules = [
    { regex: /.{10,}/, message: "Hasło musi mieć co najmniej 10 znaków", score: 3 },
    { regex: /[A-Z]/, message: "Hasło musi zawierać przynajmniej jedną wielką literę", score: 1 },
    { regex: /[a-z]/, message: "Hasło musi zawierać przynajmniej jedną małą literę", score: 1 },
    { regex: /[0-9]/, message: "Hasło musi zawierać przynajmniej jedną cyfrę", score: 1 },
    { testFunc: (password: string) => (password.match(/[^A-Za-z0-9]/g) || []).length >= 3, message: "Hasło musi zawierać przynajmniej trzy znaki specjalne", score: 3 }
];

let passwordSchema = Yup.string().required("Hasło jest wymagane");

passwordRules.forEach(rule => {
    if (rule.regex) {
        passwordSchema = passwordSchema.matches(rule.regex, rule.message)
    } else if (rule.testFunc) {
        passwordSchema = passwordSchema.test("custom-rule", rule.message, pass => rule.testFunc(pass || ""))
    }
});
const maxScore = passwordRules.reduce((acc, x) => acc + x.score, 0)
// Calculate password strength using the same rules
const calculatePasswordStrength = (password: string): number => {
    let score = 0;
    passwordRules.forEach(rule => {
        if (rule.regex && rule.regex.test(password)) score += rule.score;
        else if (rule.testFunc && rule.testFunc(password)) score += rule.score;
    });
    return score; // Returns score from 0 to 5
};

export default passwordSchema;
export { calculatePasswordStrength };
export { maxScore }