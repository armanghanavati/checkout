import React, { useState, useEffect } from "react";
import inputs from "../../tableData/FieldValues";
import Fields from "./fields/Fields";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./style.css";
import {
  handleGetUsersTable,
  selectStatus,
  selectUserMemb,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";
import { useDispatch, useSelector } from "react-redux";

const FieldsTableCheckout = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(handleGetUsersTable());
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
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
                  onchecked={isChecked}
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
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mx-2"
              />
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
    </>
  );
};

export default FieldsTableCheckout;
