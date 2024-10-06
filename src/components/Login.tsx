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

  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in...");
    setButtonState("loading");
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      setButtonState("success");
    } catch (err: unknown) {
      setButtonState("failed");
      console.error("Failed to log in:", err);
      if (err && typeof err === "object" && "status" in err) {
        const error = err as { status: number };
        if (error.status === 404) {
          alert("User not found");
        } else if (error.status === 401) {
          alert("Invalid password");
        } else {
          alert("failed to log in");
        }
      } else {
        alert("An unexpected error occured");
      }
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
