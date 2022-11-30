import React, { Fragment, useState } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import Select from "react-select";
import NumberFormat from "react-number-format";

const Fields = ({ type, lable, key, ...allProps }) => {
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
    } else if (type === "select") {
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
