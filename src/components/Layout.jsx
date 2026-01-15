import React from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const CALayout = ({ children }) => {
  const navigate = useNavigate();
  const ca = JSON.parse(localStorage.getItem("legalhubCA"));

  const logout = () => {
    localStorage.removeItem("legalhubCA");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          color: "white",
          background: "#199A8D",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/")}>
          CA Portal
        </h2>

        <span style={{ cursor: "pointer"}} onClick={logout}>
          Logout
        </span>
      </Header>

      <Content style={{ padding: "20px" }}>{children}</Content>
    </Layout>
  );
};

export default CALayout;
