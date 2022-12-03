import React from "react";
import inputs from "../../tableData/FieldValues";
import Fields from "./fields/Fields";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./style.css";

const FieldsTableCheckout = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("sub");
  };

  return (
    <Form className="" onSubmit={submitHandler}>
      <Row>
        {inputs.map((input) => {
          return (
            <Form.Group
              as={Col}
              md={input.md}
              lg={input.lg}
              xxl={input.xxl}
              key={input.id}
            >
              <Fields
                type={input.type}
                name={input.name}
                {...input}
                lable={input.label}
              />
            </Form.Group>
          );
        })}
        <Col md="4" lg="3" xxl="2">
          <label className="d-flex justify-content-end">
            <input className="mx-2" type="checkbox" />
            جستجو لحظه ای
          </label>
          <div className="d-flex justify-content-end mt-2">
            <Button className="text-center" variant="success" type="submit">
              اعمال فیلتر
            </Button>
            <Button className="text-center ms-1" variant="secondary">
              لغو فیلتر
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default FieldsTableCheckout;
