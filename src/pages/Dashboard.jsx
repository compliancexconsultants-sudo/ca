import React, { useEffect, useState } from "react";
import CALayout from "../components/Layout";
import API from "../api";
import { Table, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const ca = JSON.parse(localStorage.getItem("legalhubCA"));

  const [cases, setCases] = useState([]);

  const fetchCases = async () => {
    try {
      const res = await API.get(`/ca/assigned/${ca.ca._id}`);
      setCases(res.data);
    } catch (err) {
      console.log("CA DASHBOARD FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const columns = [
    { title: "User", dataIndex: "user" },
    { title: "Service", dataIndex: "service" },

    {
      title: "Status",
      dataIndex: "status",
      render: (st) => (
        <Tag color={st === "completed" ? "green" : "orange"}>
          {st.toUpperCase()}
        </Tag>
      )
    },

    {
      title: "Actions",
      render: (r) => (
        <Button
          type="primary"
          onClick={() => navigate(`/case/${r.caseId}`)}
          style={{ background: "#199A8D" }}
        >
          View
        </Button>
      )
    }
  ];

  const tableData = cases.map((c) => ({
    caseId: c.caseId,
    user: c.user.name,
    service: c.serviceName,
    status: c.status,
  }));

  return (
    <CALayout>
      <h2>Assigned Cases</h2>
      <Table columns={columns} dataSource={tableData} rowKey="caseId" />
    </CALayout>
  );
};

export default Dashboard;
