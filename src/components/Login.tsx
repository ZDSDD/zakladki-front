// src/components/Login.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/reducers/authSlice";
import { User } from "@/types/auth";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("https://your-api-url/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      // Dispatch login action with user data and access token
      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        // Include any other user fields as necessary
      };
      dispatch(login({ user, token: data.token }));

      // Set the refresh token in a cookie
      document.cookie = `refresh_token=${data.refreshToken}; path=/; HttpOnly; Secure`;
    } else {
      console.error("Login failed");
      // Handle error appropriately
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
