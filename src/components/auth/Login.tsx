import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/apis/authApi";
import { setCredentials } from "@/reducers/authSlice";
import { Form, Alert } from "react-bootstrap";
import { Formik, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import MultiStateButton from "../MultistateButton";
import { ButtonState } from "../MultistateButton";
import { LoginResponse } from "@/types/auth";

interface LoginProps {
    className?: string;
}

interface LoginButtonState {
    state: ButtonState;
    msg: React.ReactNode;
}

const buttonStates: Record<string, LoginButtonState> = {
    default: { state: "default", msg: "Zaloguj" },
    loading: { state: "loading", msg: "Trwa ładowanie" },
    failed: { state: "failed", msg: "Spróbuj ponownie" },
    success: { state: "success", msg: "Sukces!" },
};

const Login: React.FC<LoginProps> = () => {
    const dispatch = useDispatch();
    const [login] = useLoginMutation();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Nieprawidłowy adres email")
            .required("Email jest wymagany"),
        password: Yup.string().required("Hasło jest wymagane"),
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

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                setStatus({ buttonState: buttonStates.loading });

                try {
                    const userData: LoginResponse = await login({
                        email: values.email,
                        password: values.password,
                    }).unwrap();
                    dispatch(setCredentials(userData));
                    setStatus({ buttonState: buttonStates.success });
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
            {({ handleSubmit, isSubmitting, status }) => (
                <Form onSubmit={handleSubmit}>
                    <Field name="email">
                        {({ field, meta }: FieldProps) => (
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Adres email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Wprowadź email"
                                    {...field}
                                    isInvalid={meta.touched && meta.error !== null}
                                />
                                <ErrorMessage name="email">
                                    {(msg) => (
                                        <Form.Control.Feedback type="invalid">
                                            {msg}
                                        </Form.Control.Feedback>
                                    )}
                                </ErrorMessage>
                            </Form.Group>
                        )}
                    </Field>

                    <Field name="password">
                        {({ field, meta }: FieldProps) => (
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Hasło"
                                    {...field}
                                    isInvalid={meta.touched && meta.error !== null}
                                />
                                <ErrorMessage name="password">
                                    {(msg) => (
                                        <Form.Control.Feedback type="invalid">
                                            {msg}
                                        </Form.Control.Feedback>
                                    )}
                                </ErrorMessage>
                            </Form.Group>
                        )}
                    </Field>

                    {status?.errorMsg && (
                        <Alert variant="danger">{status.errorMsg}</Alert>
                    )}

                    <MultiStateButton
                        state={status?.buttonState?.state || buttonStates.default.state}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {status?.buttonState?.msg || buttonStates.default.msg}
                    </MultiStateButton>

                </Form>
            )}

        </Formik>
    );
};

export default Login;
