// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/apis/authApi"; // Adjust the path to your authApi
import { setCredentials } from "@/reducers/authSlice"; // Adjust the path to your authSlice
import Form from "react-bootstrap/Form";
import MultiStateButton from "./MultistateButton";
import { ButtonState } from "./MultistateButton";

interface RegisterProps {
  className?: string;
}
interface RegisterButtonState {
  state: ButtonState;
  msg: React.ReactNode;
}

const defaultButton: RegisterButtonState = {
  state: "default",
  msg: "zarejestruj",
};

const loadingButton: RegisterButtonState = {
  state: "loading",
  msg: "trwa ładowanie",
};

const failedButton: RegisterButtonState = {
  state: "failed",
  msg: "spróbuj ponownie",
};

const successButton: RegisterButtonState = {
  state: "success",
  msg: "sukces!",
};

const Register: React.FC<RegisterProps> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [buttonState, setButtonState] =
    useState<RegisterButtonState>(defaultButton);
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const handleLoginError = (err: unknown) => {
    console.error("Failed to log in:", err);

    if (err && typeof err === "object" && "status" in err) {
      const error = err as { status: number; data?: { error?: string } };

      switch (error.status) {
        case 400:
          if (error.data?.error) {
            return error.data.error;
          }
          break;
        case 404:
          return "User not found";
        case 401:
          return "Invalid password";
        case 500:
        default:
          return "Something is wrong on our side. Try again later and sorry! :(";
      }
    }

    return "An unexpected error occurred";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password != retypedPassword) {
      setErrorMsg("Passwords are not the same");
      return;
    }

    console.log("Logging in...");
    setButtonState(loadingButton);

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      setButtonState(successButton);
      setErrorMsg("");
    } catch (err: unknown) {
      setButtonState(failedButton);
      const errorMsg = handleLoginError(err);
      setErrorMsg(errorMsg);
    }
  };

  return (
    <div className={`${className} flex flex-col space-y-3 p-3`}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Enter a valid email!
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Imię</Form.Label>
          <Form.Control
            type="email"
            placeholder="twoje imię"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <Form.Text className="text-muted">some text here</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="hasło"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="powtórz hasło"
            onChange={(e) => {
              setRetypedPassword(e.target.value);
            }}
            required
          />
        </Form.Group>
        {errorMsg != "" && (
          <div className="mb-2 text-orange-500">
            <span>{errorMsg}</span>
          </div>
        )}
        <MultiStateButton state={buttonState.state} type="submit">
          {buttonState.msg}
        </MultiStateButton>
      </Form>
    </div>
  );
};

export default Register;
