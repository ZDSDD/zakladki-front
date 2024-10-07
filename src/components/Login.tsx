// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/apis/authApi"; // Adjust the path to your authApi
import { setCredentials } from "@/reducers/authSlice"; // Adjust the path to your authSlice
import Form from "react-bootstrap/Form";
import MultiStateButton from "./MultistateButton";
import { ButtonState } from "./MultistateButton";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonState, setButtonState] = useState<ButtonState>("default");
  const [errorMsg, setErrorMsg] = useState("");
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
    console.log("Logging in...");
    setButtonState("loading");

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      setButtonState("success");
      setErrorMsg("");
    } catch (err: unknown) {
      setButtonState("failed");
      const errorMsg = handleLoginError(err);
      setErrorMsg(errorMsg);
    }
  };

  return (
    <div className="border border-blue-500 flex flex-col space-y-3 max-w-96 p-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        {errorMsg != "" && (
          <div className="mb-2 text-orange-500">
            <span>{errorMsg}</span>
          </div>
        )}
        <MultiStateButton
          state={buttonState}
          onClick={() => {
            console.log("Button clicked");
          }}
          type="submit"
        ></MultiStateButton>
      </Form>
    </div>
  );
};

export default Login;
