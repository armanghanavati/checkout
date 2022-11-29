import React from "react";
import inputs from "../../tableData/FieldValues";
import Fields from "./fields/Fields";
import { Form, Button, Row } from "react-bootstrap";
import "./style.css";
import TableChackoutLists from "../tableChackoutLists/TableChackoutLists";

const FieldsTableCheckout = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("sub");
  };

  return (
    <div className="align-items-center mb-5 ">
      <Form className="p-4" onSubmit={submitHandler}>
        {inputs.map((input) => {
          return (
            <div key={input.id} className="mx-2">
              <Fields type={input.type} {...input} lable={input.label} />
            </div>
          );
        })}
        <div className="">
          <label className="">
            <input className="mx-2" type="checkbox" />
            جستجو لحظه ای
          </label>
          <div className="d-flex justify-content-between mt-2 col-xl-4 col-md-5">
            <Button
              className=" text-center mx-1"
              variant="success"
              type="submit"
            >
              اعمال فیلتر
            </Button>
            <Button className=" text-center mx-1" variant="secondary">
              لغو فیلتر
            </Button>
          </div>
        </div>
      </Form>
      <TableChackoutLists />
    </div>
  );
};

export default FieldsTableCheckout;
