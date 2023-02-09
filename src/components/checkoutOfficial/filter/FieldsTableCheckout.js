import React, { useState } from "react";
import inputs from "../table/tableData/FieldValues";
import Fields from "./fields/Fields";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  selectCompany,
  selectDep,
  selectFromDate,
  selectToDate,
  RsetLeavingWork,
  RsetUserCheckoutTable,
  RsetStatusTable,
  RsetToDateTable,
  RsetFromDateTable,
  RsetDepartmantCheckoutTable,
  RsetCompanyCheckout,
  selectUserMemb,
  selectValueStatus,
  selectLeavingWorkCause,
} from "../../slices/CheckoutOfficialSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleReqsList, RsetRealFilter, selectRealFilter } from "../../slices/mainSlices";

const FieldsTableCheckout = () => {

  const dispatch = useDispatch();
  const dep = useSelector(selectDep);
  const company = useSelector(selectCompany);
  const userMemb = useSelector(selectUserMemb);
  const fromDateTime = useSelector(selectFromDate);
  const toDateTime = useSelector(selectToDate);
  const valueStatus = useSelector(selectValueStatus);
  const leavingWorkCause = useSelector(selectLeavingWorkCause);
  const realFilter = useSelector(selectRealFilter);


  const filterValues = {
    applicant_id: localStorage.getItem("id"),
    leaver: userMemb !== "" ? userMemb.value : userMemb,
    status: valueStatus !== "" ? valueStatus.value : valueStatus,
    fromDate:
      fromDateTime !== null ? fromDateTime.format("YYYY/MM/DD") : "null",
    toDate: toDateTime !== null ? toDateTime.format("YYYY/MM/DD") : "null",
    leavingWorkCause:
      leavingWorkCause !== "" ? leavingWorkCause.value : leavingWorkCause,
    company: company !== "" ? company.value : "",
    department: dep !== "" ? dep.value : "",
    role: "",
    type: 10,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleReqsList(filterValues));
  };

  const cancelFilter = () => {
    dispatch(RsetLeavingWork(""));
    dispatch(RsetUserCheckoutTable(""));
    dispatch(RsetStatusTable(""));
    dispatch(RsetToDateTable(null));
    dispatch(RsetFromDateTable(null));
    dispatch(RsetDepartmantCheckoutTable(""));
    dispatch(RsetCompanyCheckout(""));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
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
                  onchecked={realFilter}
                  type={input.type}
                  name={input.name}
                  {...input}
                  lable={input.label}
                />
              </Form.Group>
            );
          })}
          <Col md="4" lg="3" xxl="2">
            <Form.Group className="d-flex align-items-center mb-3 justify-content-end">
              <input className="" type='checkbox' name='realFilter'
                value={realFilter}
                checked={realFilter}
                onChange={() => { dispatch(RsetRealFilter(!realFilter)) }} />
              <Form.Label className='ms-2 font12 mb-0'> جستجو لحظه ای </Form.Label>
            </Form.Group>
            <div className="d-flex justify-content-end mt-2">
              <Button
                className="font12 text-center"
                variant="success"
                type="submit"
              >
                اعمال فیلتر
              </Button>
              <Button
                onClick={cancelFilter}
                className="font12 text-center ms-1"
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
