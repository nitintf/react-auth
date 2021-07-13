import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const UpdateName = () => {
  const nameRef = useRef();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { currentUser, updateDisplayName } = useAuth();

  async function formSubmitHandler(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await updateDisplayName(nameRef.current.value);
      history.push("/");
    } catch (err) {
      setError(`Failed to update Name ${err.message}`);
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Update Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={formSubmitHandler}>
            <Form.Group id="email">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                required
                ref={nameRef}
                defaultValue={
                  currentUser.displayName
                    ? currentUser.displayName
                    : "Enter your Name"
                }
              ></Form.Control>
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-2" type="submit">
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Update"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateName;
