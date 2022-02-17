import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadData, validateToken, getUserData } from "../api/api.services";
import DataTable from "../components/dataTable";
import UserDataTable from "../components/table";

import "./dashboard.css";

const Dashboard = () => {
  const [file, setFile] = useState();
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState();
  const [showData, setShowData] = useState();
  const [data, setData] = useState();
  const nav = useNavigate();

  async function fetchUserData() {
    return getUserData()
      .then((res) => setUserData(res.data.data))
      .catch((err) => console.log(err));
  }

  async function getAuth() {
    return validateToken()
      .then((res) => true)
      .catch((err) => nav("/"));
  }
  useEffect(() => {
    getAuth().then((res) => {
      fetchUserData();
    });
  }, [nav]);

  const handleFileSubmit = () => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    uploadData(formData)
      .then((res) => {
        setMessage("Uploaded successfully");
        fetchUserData();
        setFile(null);
      })
      .catch((err) => console.log(err));
  };

  const handleUserDataClick = (id) => {
    getUserData(id).then((res) => {
      setData(res.data.data);
      setShowData(true);
    });
  };

  const handleOnBackClick = () => {
    setShowData(false);
  };

  const logout = () => {
    window.sessionStorage.setItem("auth_token", "");
    nav("/");
  };

  return (
    <div className="dashboard-container">
      {!showData && (
        <div>
          <div className="file-upload">
            <input
              name="file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            ></input>
            <Button
              onClick={handleFileSubmit}
              variant="outlined"
              className="upload-button"
            >
              Upload
            </Button>
            {message && <span className="dashboard-message">{message}</span>}
          </div>
          <div className="data-container">
            {userData && (
              <UserDataTable
                userData={userData}
                handleUserDataClick={handleUserDataClick}
              />
            )}
            {!userData && (
              <span style={{ fontSize: "40px", fontWeight: "bold" }}>
                No data found
              </span>
            )}
          </div>
        </div>
      )}
      {showData && (
        <DataTable data={data} handleOnBackClick={handleOnBackClick} />
      )}
      {!showData && (
        <span className="dashboard-note">
          Note: Click on file name to access the data
        </span>
      )}
      {!showData && (
        <Button onClick={logout} className="logout-button" variant="contained">
          Logout
        </Button>
      )}
    </div>
  );
};

export default Dashboard;
