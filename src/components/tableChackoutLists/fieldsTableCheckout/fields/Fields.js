import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeavingWorkCause,
  addUserMemb,
  addStatus,
  selectAllStatus,
  selectFromDate,
  selectLeavingWorkCause,
  selectToDate,
  selectUserMemb,
  selectUserMembers,
  selectValueStatus,
  addToDate,
  addFromDate,
  handleGetUsersTable,
} from "../../../checkoutOfficialSlice/TableCheckoutSlice";
import { selectReasonLeavingData } from "../../../checkoutOfficialSlice/CheckoutOfficialSlice";

const Fields = ({ name, type, lable, key, onchecked, ...allProps }) => {
  const dispatch = useDispatch();
  const userMembers = useSelector(selectUserMembers);
  const userMemb = useSelector(selectUserMemb);
  const reasonLeavingData = useSelector(selectReasonLeavingData);
  const LeavingWorkCause = useSelector(selectLeavingWorkCause);
  const fromDateTime = useSelector(selectFromDate);
  const toDateTime = useSelector(selectToDate);
  const allStatus = useSelector(selectAllStatus);
  const valueStatus = useSelector(selectValueStatus);

  const test = () => {
    if (name === "applicant") {
      return (
        <Select
          value={userMemb}
          onChange={(e) => {
            dispatch(addUserMemb(e));
            if (onchecked) {
              dispatch(handleGetUsersTable());
            }
          }}
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
          onChange={(e) => {
            dispatch(addLeavingWorkCause(e));
            if (onchecked) {
              dispatch(handleGetUsersTable());
            }
          }}
        />
      );
    } else if (name === "company") {
      return (
        <Select
          {...allProps}
          className=""
          // value={LeavingWorkCause}
          // options={reasonLeavingData}
          // onChange={(e) => {
          //   dispatch(addLeavingWorkCause(e));
          //   if (onchecked) {
          //     dispatch(handleGetUsersTable());
          //   }
          // }}
        />
      );
    } else if (name === "unit") {
      return (
        <Select
          {...allProps}
          className=""
          // value={LeavingWorkCause}
          // options={reasonLeavingData}
          // onChange={(e) => {
          //   dispatch(addLeavingWorkCause(e));
          //   if (onchecked) {
          //     dispatch(handleGetUsersTable());
          //   }
          // }}
        />
      );
    } else if (name === "status") {
      return (
        <Select
          options={allStatus}
          onChange={(e) => {
            dispatch(addStatus(e));
            if (onchecked) {
              dispatch(handleGetUsersTable());
            }
          }}
          value={valueStatus}
          {...allProps}
          className="mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4 w-100"
        />
      );
    } else if (name === "fromDate") {
      return (
        <DatePicker
          inputReadOnly
          className="form-control mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4"
          value={fromDateTime}
          onChange={(e) => {
            dispatch(addFromDate(e));
            console.log(fromDateTime);
          }}
          {...allProps}
        />
      );
    } else if (name === "toDate") {
      return (
        <DatePicker
          inputReadOnly
          className="form-control mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4"
          value={toDateTime}
          onChange={(e) => dispatch(addToDate(e))}
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
