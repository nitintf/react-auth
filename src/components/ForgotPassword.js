import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  async function formSubmitHandler(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your Inbox for further instructions");
    } catch (err) {
      setError(`Failed to Reset Password- ${err.message}`);
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Passowrd Reset</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={formSubmitHandler}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef}></Form.Control>
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
                "Reset Password"
              )}
            </Button>
            <div className="w-100 text-center mt-3">
              <Link to="/login">LogIn</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Create new Account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
