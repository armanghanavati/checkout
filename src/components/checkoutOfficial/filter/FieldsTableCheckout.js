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
import { handleReqsList, RsetIsLoadingCheckout } from "../../slices/mainSlices";

const FieldsTableCheckout = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const dep = useSelector(selectDep);
  const company = useSelector(selectCompany);
  const userMemb = useSelector(selectUserMemb);
  const fromDateTime = useSelector(selectFromDate);
  const toDateTime = useSelector(selectToDate);
  const valueStatus = useSelector(selectValueStatus);
  const leavingWorkCause = useSelector(selectLeavingWorkCause);

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
