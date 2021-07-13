import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { currentUser, updateEmail, updatePassword } = useAuth();

  function formSubmitHandler(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Password do not match");
    }

    const promisses = [];
    setError("");
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promisses.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promisses.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promisses)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setError(`Failed to update Profile - ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Update Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={formSubmitHandler}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                ref={emailRef}
                defaultValue={currentUser.email}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="leave blank to keep tha same"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                placeholder="leave blank to keep tha same"
                ref={confirmPasswordRef}
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

export default UpdateProfile;
