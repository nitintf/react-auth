import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [error, setError] = useState("");
  const history = useHistory();

  const { currentUser, signOut } = useAuth();

  async function logoutHandler() {
    setError("");
    try {
      await signOut();
      history.push("/login");
    } catch (err) {
      setError(`Failed to logout! ${err.message}`);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4 d-block">Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <div>
            <strong>Email: </strong> {currentUser.email}
          </div>
          <div>
            <strong>Name: </strong>{" "}
            {currentUser.displayName
              ? currentUser.displayName
              : "Update your Name"}
          </div>
          <div className="d-flex gap-2">
            <Link to="/update-name" className="btn btn-primary w-100  mt-3 ">
              Update Information
            </Link>
            <Link to="/update-profile" className="btn btn-primary w-100  mt-3">
              Update Security
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="text-center w-100 mt-2">
        <Button variant="link" onClick={logoutHandler} type="submit">
          LogOut
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
