import React, { useState, useEffect } from "react";
import inputs from "../../tableData/FieldValues";
import Fields from "./fields/Fields";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./style.css";
import {
  addMemberId,
  addStatus,
  addUserMemb,
  handleGetUsersTable,
  selectStatus,
  selectUserMemb,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";
import { useDispatch, useSelector } from "react-redux";

const FieldsTableCheckout = () => {
  const leaver = useSelector(selectUserMemb);
  const status = useSelector(selectStatus);
  const fromDate = useSelector(selectUserMemb);
  const toDate = useSelector(selectUserMemb);
  const leavingWorkCause = useSelector(selectUserMemb);

  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const userMemb = useSelector(selectUserMemb);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   // setIsSubmit(true);
  //   const values = {
  //     leaver: leaver,
  //     status: status,
  //     fromDate: fromDate,
  //     toDate: toDate,
  //     leavingWorkCause: leavingWorkCause,
  //   };
  //   console.log(values);
  //   console.log(dispatch(handleGetUsersTable(values)));
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    // setIsSubmit(true);
    console.log(dispatch(handleGetUsersTable()));
  };

  useEffect(() => {
    dispatch(handleGetUsersTable());
    setIsSubmit(false);
  }, [isSubmit, dispatch]);

  return (
    <>
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
    </>
  );
};

export default FieldsTableCheckout;
