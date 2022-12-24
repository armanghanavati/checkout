import React, { useState, useEffect } from "react";
import inputs from "../../tableData/FieldValues";
import Fields from "./fields/Fields";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./style.css";
import {
  handleGetUsersTable,
  selectCompany,
  selectDep,
  selectFromDate,
  selectLeavingWorkCause,
  selectStatus,
  selectToDate,
  addLeavingWorkCause,
  addUserMemb,
  addStatus,
  addToDate,
  addFromDate,
  addDep,
  addCompany,
  selectUserMemb,
  selectValueStatus,
} from "../../slices/TableCheckoutSlice";
import { useDispatch, useSelector } from "react-redux";

const FieldsTableCheckout = () => {
  const dep = useSelector(selectDep);
  const company = useSelector(selectCompany);
  const userMemb = useSelector(selectUserMemb);
  const LeavingWorkCause = useSelector(selectLeavingWorkCause);
  const fromDateTime = useSelector(selectFromDate);
  const toDateTime = useSelector(selectToDate);
  const valueStatus = useSelector(selectValueStatus);

  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(handleGetUsersTable());
  };

  const cancelFilter = () => {
    dispatch(addLeavingWorkCause(""));
    dispatch(addUserMemb(""));
    dispatch(addStatus(""));
    dispatch(addToDate(null));
    dispatch(addFromDate(null));
    dispatch(addDep(""));
    dispatch(addCompany(""));
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
              <Button
                onClick={cancelFilter}
                className="text-center ms-1"
                variant="secondary"
              >
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
