import React, { Fragment, useState } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import Select from "react-select";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  addDate,
  addLeavingWorkCause,
  addUserMemb,
  middleware,
  selectFromDate,
  selectLeavingWorkCause,
  selectToDate,
  selectUserMemb,
  selectUserMembers,
} from "../../../checkoutOfficialSlice/TableCheckoutSlice";
import {
  selectReasonLeavingData,
  selectReasonLeavingTable,
  setReasonLeavingHandler,
} from "../../../checkoutOfficialSlice/CheckoutOfficialSlice";

const Fields = ({ name, type, lable, key, ...allProps }) => {
  const dispatch = useDispatch();
  const userMembers = useSelector(selectUserMembers);
  const userMemb = useSelector(selectUserMemb);
  const reasonLeavingData = useSelector(selectReasonLeavingData);
  const reasonLeavingTable = useSelector(selectReasonLeavingTable);
  const LeavingWorkCause = useSelector(selectLeavingWorkCause);
  const fromDateTime = useSelector(selectFromDate);
  const toDateTime = useSelector(selectToDate);

  const test = () => {
    if (name === "applicant") {
      return (
        <Select
          value={userMemb}
          onChange={(e) => dispatch(addUserMemb(e))}
          options={userMembers}
          {...allProps}
          className="mb-4 mb-xl-4 col-12 col-sm-12 col-md-12 col-md-4 w-100"
        />
      );
    } else if (name === "reasonLeavingCase") {
      return (
        <Select
          {...allProps}
          className=""
          value={LeavingWorkCause}
          options={reasonLeavingData}
          onChange={(e) => dispatch(addLeavingWorkCause(e))}
        />
      );
    } else if (name === "status") {
      return (
        <Select
          {...allProps}
          className="mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4 w-100"
        />
      );
    } else if (name === "fromDate") {
      return (
        <DatePicker
          className="form-control mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4"
          // value={fromDateTime}
          // onChange={(e) => dispatch(addDate(e))}
          {...allProps}
        />
      );
    } else if (name === "toDate") {
      return (
        <DatePicker
          className="form-control mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4"
          // value={toDateTime}
          // onChange={(e) => dispatch(addDate(e))}
          {...allProps}
        />
      );
    }
  };
  return (
    <Fragment>
      <Form.Label className=" mb-1 form-label">{lable}</Form.Label>
      {test()}
    </Fragment>
  );
};

export default Fields;
