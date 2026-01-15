import React, { useEffect, useState } from "react";
import CALayout from "../components/Layout";
import API from "../api";
import { Card, Tag, Button, Select, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";

const CaseDetails = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const loadCase = async () => {
    try {
      const res = await API.get(`/ca/case/${caseId}`);
      setData(res.data);
    } catch (err) {
      console.log("Case details error:", err);
    }
  };

  const updateStatus = async (value) => {
    try {
      await API.put(`/ca/status/${caseId}`, { status: value });
      message.success("Status updated!");
      loadCase();
    } catch {
      message.error("Failed to update status");
    }
  };

  useEffect(() => {
    loadCase();
  }, []);

  if (!data) return <CALayout>Loading...</CALayout>;

  return (
    <CALayout>
      <Card>
        <h2>{data.serviceName}</h2>

        <p><strong>User:</strong> {data.user.name}</p>
        <p><strong>Email:</strong> {data.user.email}</p>
        <p><strong>Phone:</strong> {data.user.phone}</p>

        <p>
          <strong>Status:</strong>
          <Tag color={data.status === "completed" ? "green" : "orange"}>
            {data.status.toUpperCase()}
          </Tag>
        </p>

        <Select
          defaultValue={data.status}
          style={{ width: 200 }}
          onChange={updateStatus}
          options={[
            { value: "in-progress", label: "In Progress" },
            { value: "completed", label: "Completed" },
          ]}
        />

        <h3 style={{ marginTop: 20 }}>Documents</h3>
        {data.documents?.map((doc, i) => (
          <p key={i}>
            <a href={doc.file} target="_blank" rel="noreferrer">📄 {doc.key}</a>
          </p>
        ))}

        <Button
          type="primary"
          style={{ marginTop: 20, background: "#199A8D" }}
          onClick={() => navigate(`/chat/${caseId}`)}
        >
          Chat With User
        </Button>

      </Card>
    </CALayout>
  );
};

export default CaseDetails;
