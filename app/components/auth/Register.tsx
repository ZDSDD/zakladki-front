import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Register.css"
import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Formik, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import MultiStateButton from "../MultistateButton";
import { ButtonState } from "../MultistateButton";
import passSchema, { calculatePasswordStrength, maxScore } from "./passwordSchema"
import { useAuthStore } from "@/store/authStore";

interface RegisterProps {
    onAuthSuccess: () => void;
}

interface RegisterButtonState {
    state: ButtonState;
    msg: React.ReactNode;
}

const buttonStates: Record<string, RegisterButtonState> = {
    default: { state: "default", msg: "Zarejestruj" },
    loading: { state: "loading", msg: "Trwa ładowanie" },
    failed: { state: "failed", msg: "Spróbuj ponownie" },
    success: { state: "success", msg: "Sukces!" },
};

const Register: React.FC<RegisterProps> = ({ onAuthSuccess }) => {
    const { register } = useAuthStore();
    const [passwordScore, setPasswordScore] = useState<number>(0);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z]+$/, "Imię może zawierać tylko litery")
            .required("Imię jest wymagane"),
        email: Yup.string()
            .email("Nieprawidłowy adres email")
            .required("Email jest wymagany"),
        password: passSchema.test('password-strength', 'Hasło jest zbyt słabe', function (value) {
            const strength = calculatePasswordStrength(value || "");
            setPasswordScore(strength);
            return strength !== 0;
        }),
        retypedPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Hasła muszą być takie same")
            .required("Potwierdzenie hasła jest wymagane"),
    });

    const handleLoginError = (err: unknown): string => {
        console.error("Failed to log in:", err);

        if (err && typeof err === "object" && "status" in err) {
            const error = err as { status: number; data?: { error?: string } };

            switch (error.status) {
                case 400:
                    return error.data?.error || "Nieprawidłowe dane";
                case 404:
                    return "Użytkownik nie znaleziony";
                case 401:
                    return "Nieprawidłowe hasło";
                case 500:
                default:
                    return "Wystąpił błąd po naszej stronie. Przepraszamy i spróbuj ponownie później.";
            }
        }

        return "Wystąpił nieoczekiwany błąd";
    };


    // Map score to the color and width of the bar
    const getStrengthBarStyle = (score: number) => {
        const ratio = (score / maxScore) * 100;
        let color = "red";
        if (ratio > 80) {
            color = "green"
        } else if (ratio > 60) {
            color = "yellow"
        } else if (ratio > 40) {
            color = "orange"
        }
        return {
            backgroundColor: color,
            width: ratio.toString().concat("%") || "0%",
        };
    };

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                retypedPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                setStatus({ buttonState: buttonStates.loading });

                try {
                    const registerSuccess = await register({
                        name: values.name,
                        email: values.email,
                        password: values.password,
                    })
                    if (registerSuccess) {
                        setStatus({ buttonState: buttonStates.success });
                        onAuthSuccess();
                    } else {
                        setStatus({
                            buttonState: buttonStates.failed,
                            errorMsg: "Rejestracja nie powiodła się",
                        });
                    }
                } catch (err: unknown) {
                    setStatus({
                        buttonState: buttonStates.failed,
                        errorMsg: handleLoginError(err),
                    });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ handleSubmit, status }) => (
                <Form onSubmit={handleSubmit} noValidate>
                    <Field name="name">
                        {({ field, meta }: FieldProps) => (
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...field}
                                    isInvalid={meta.touched && !!meta.error}
                                    isValid={meta.touched && !meta.error}
                                />
                                <ErrorMessage name="name">
                                    {(msg) => (
                                        <Form.Control.Feedback type="invalid">
                                            {msg}
                                        </Form.Control.Feedback>
                                    )}
                                </ErrorMessage>
                                {meta.touched && !meta.error && (
                                    <Form.Control.Feedback type="valid">
                                        Wygląda dobrze!
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                        )}
                    </Field>

                    <Field name="email">
                        {({ field, meta }: FieldProps) => (
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Adres email</Form.Label>
                                <Form.Control
                                    type="email"
                                    {...field}
                                    isInvalid={meta.touched && !!meta.error}
                                    isValid={meta.touched && !meta.error}
                                />
                                <ErrorMessage name="email">
                                    {(msg) => (
                                        <Form.Control.Feedback type="invalid">
                                            {msg}
                                        </Form.Control.Feedback>
                                    )}
                                </ErrorMessage>
                                <Form.Control.Feedback type="valid">
                                    Wygląda dobrze!
                                </Form.Control.Feedback>
                            </Form.Group>
                        )}
                    </Field>

                    <Field name="password">
                        {({ field, meta }: FieldProps) => (
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Hasło</Form.Label>

                                <Form.Control
                                    type="password"
                                    {...field}
                                    isInvalid={meta.touched && !!meta.error}
                                    isValid={meta.touched && !meta.error}
                                />
                                <div className="strength-bar-container border-1">
                                    <div
                                        className="strength-bar"
                                        style={getStrengthBarStyle(passwordScore)}
                                    ></div>
                                </div>
                                <ErrorMessage name="password">
                                    {(msg) => (
                                        <Form.Control.Feedback type="invalid">
                                            {msg}
                                        </Form.Control.Feedback>
                                    )}
                                </ErrorMessage>
                                <Form.Control.Feedback type="valid">
                                    Fajne hasło! Tak trzymaj! :)
                                </Form.Control.Feedback>
                            </Form.Group>
                        )}
                    </Field>

                    <Field name="retypedPassword">
                        {({ field, meta }: FieldProps) => (
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicRetypedPassword"
                            >
                                <Form.Label>Powtórz hasło</Form.Label>
                                <Form.Control
                                    type="password"
                                    {...field}
                                    isInvalid={meta.touched && !!meta.error}
                                    isValid={meta.touched && !meta.error}
                                />
                                <ErrorMessage name="retypedPassword">
                                    {(msg) => (
                                        <Form.Control.Feedback type="invalid">
                                            {msg}
                                        </Form.Control.Feedback>
                                    )}
                                </ErrorMessage>
                                <Form.Control.Feedback type="valid">
                                    Przepisane doskonale! Ekstra! :-)
                                </Form.Control.Feedback>
                            </Form.Group>
                        )}
                    </Field>

                    {status?.errorMsg && (
                        <Alert variant="danger">{status.errorMsg}</Alert>
                    )}

                    <MultiStateButton
                        state={status?.buttonState?.state || buttonStates.default.state}
                        type="submit"
                    >
                        {status?.buttonState?.msg || buttonStates.default.msg}
                    </MultiStateButton>
                </Form>
            )}
        </Formik>
    );
};

export default Register;
