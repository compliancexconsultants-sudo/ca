import React, { useState } from "react";
import { Card, Input, Button, message } from "antd";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/ca/login", { email, password });

      localStorage.setItem("legalhubCA", JSON.stringify(res.data));
      message.success("Login successful");
      navigate("/");
    } catch (err) {
      message.error(err?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 120 }}>
      <Card style={{ width: 350 }}>
        <h2>CA Login</h2>

        <Input
          placeholder="Email"
          style={{ marginTop: 10 }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input.Password
          placeholder="Password"
          style={{ marginTop: 10 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="primary"
          style={{ marginTop: 15, width: "100%", background: "#199A8D" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Login;
