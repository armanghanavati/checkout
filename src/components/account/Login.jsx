import React, { Fragment } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleLogin,
  RsetPassword,
  RsetUsername,
  selectPassword,
  selectUserName,
} from "../slices/mainSlices";
const Login = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPassword = useSelector(selectPassword);
  const history = useNavigate();

  return (
    <Fragment>
      <Container fluid>
        <Form>
          <Col xl="6">
            <Form.Label> نام کاربری: </Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => {
                dispatch(RsetUsername(e.target.value));
              }}
            />
            <Form.Label> رمز عبور: </Form.Label>
            <Form.Control
              type="password"
              value={userPassword}
              onChange={(e) => {
                dispatch(RsetPassword(e.target.value));
              }}
            />
          </Col>
          <Col>
            <Button className="mt-2" onClick={() => dispatch(handleLogin(history))}>ورود</Button>
          </Col>
        </Form>
      </Container>
    </Fragment>
  );
};

export default Login;
