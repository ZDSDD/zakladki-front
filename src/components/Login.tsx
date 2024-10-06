// Import Bootstrap styles
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/apis/authApi"; // Adjust the path to your authApi
import { setCredentials } from "@/reducers/authSlice"; // Adjust the path to your authSlice
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in...");
    try {
      const userData = await login({ email, password }).unwrap();
      console.log("Logged in:", userData);
      dispatch(setCredentials(userData));
    } catch (err: unknown) {
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
    <div className="border border-blue-500 flex flex-col space-y-5 max-w-96">
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
        <div className="flex justify-center items-center mb-3">
          {isLoading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Loggin in ...
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Login;
