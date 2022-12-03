import React, { Fragment, useState } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import Select from "react-select";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserMemb,
  selectUserMemb,
  selectUserMembers,
} from "../../../checkoutOfficialSlice/TableCheckoutSlice";

const Fields = ({ name, type, lable, key, ...allProps }) => {
  const dispatch = useDispatch();
  const userMembers = useSelector(selectUserMembers);
  const userMemb = useSelector(selectUserMemb);
  const [time, setTime] = useState(null);
  

  const timerHandler = (e) => {
    setTime(e);
  };

  const test = () => {
    if (type === "numb") {
      return (
        <NumberFormat
          className=" mb-xl-4 col-12 col-sm-12 col-md-12 col-xl-2 col-xxl-2 form-control"
          {...allProps}
        />
      );
    } else if (name === "applicant") {
      return (
        <Select
          value={userMemb}
          onChange={(e) => dispatch(addUserMemb(e))}
          options={userMembers}
          {...allProps}
          className="mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4 w-100"
        />
      );
    } else if (name === "status") {
      return (
        <Select
          {...allProps}
          className="mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4 w-100"
        />
      );
    } else if (type === "date") {
      return (
        <DatePicker
          className="form-control mb-4 mb-xl-0 col-12 col-sm-12 col-md-12 col-md-4"
          value={time}
          onChange={timerHandler}
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
