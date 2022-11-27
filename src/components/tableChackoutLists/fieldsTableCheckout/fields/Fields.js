import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
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
      return <NumberFormat className="form-control" {...allProps} />;
    } else if (type === "select") {
      return <Select {...allProps} />;
    } else if (type === "date") {
      return (
        <DatePicker
          className="form-control"
          value={time}
          onChange={timerHandler}
          {...allProps}
        />
      );
    } else if (type === "number") {
    } else if (type === "checkbox") {
      return (
        <Form.Group className="" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
      );
    }
  };
  return (
    <div className="p-3">
      {lable}
      {test()}
    </div>
  );
};

export default Fields;
