import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { logIn } = useAuth();

  async function formSubmitHandler(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError(`Failed to LogIn- ${err.message}`);
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Log in</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={formSubmitHandler}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef}></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordRef}
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
                "LogIn"
              )}
            </Button>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
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

export default Login;
