import React, { Fragment } from "react";
import { Col, Form, Row } from "react-bootstrap";

const ExpensesAccountFilter = () => {
  return (
    <Fragment>
      <Form>
        <Row>
          <Col>
            <label>درخواست کننده:</label>
            <Form.Control />
          </Col>
          <Col>
            <label>وضعیت درخواست:</label>
            <Form.Control />
          </Col>
          <Col>
            <label>وضعیت درخواست:</label>
            <Form.Control />
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default ExpensesAccountFilter;
