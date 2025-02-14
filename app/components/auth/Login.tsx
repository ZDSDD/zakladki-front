import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Form, Alert } from "react-bootstrap";
import { Formik, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import MultiStateButton from "../MultistateButton";
import { ButtonState } from "../MultistateButton";
import { useAuthStore } from '@/store/authStore';

interface LoginProps {
    className?: string;
    onAuthSuccess: () => void;
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

const Login: React.FC<LoginProps> = ({ onAuthSuccess }) => {
    const { login } = useAuthStore();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Nieprawidłowy adres email")
            .required("Email jest wymagany"),
        password: Yup.string().required("Hasło jest wymagane"),
    });

    const handleLoginError = (err: Error | unknown) => {
        if (err instanceof Error) {
            return err.message;
        }
        return "Wystąpił nieznany błąd";
    }
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
                    const loginSucc = await login(values);
                    if (!loginSucc) {
                        throw new Error("Failed to log in");
                    }
                    setStatus({ buttonState: buttonStates.success });
                    onAuthSuccess();

                } catch (err: Error | unknown) {

                    // FAIL

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
                                    isInvalid={meta.error ? meta.error.length > 0 : false}
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
                                    isInvalid={meta.error ? meta.error.length > 0 : false}
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
