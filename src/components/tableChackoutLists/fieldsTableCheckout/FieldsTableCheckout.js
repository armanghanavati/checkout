import React from "react";
import inputs from "../../tableData/FieldValues";
import Fields from "./fields/Fields";
import { Form, Button } from "react-bootstrap";

const FieldsTableCheckout = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("sub");
  };

  return (
    <div>
      <Form className="p-4" onSubmit={submitHandler}>
        {inputs.map((input) => {
          return (
            <div key={input.id}>
              <Fields type={input.type} {...input} lable={input.label} />
            </div>
          );
        })}
        <div className="mx-2">
          <Button className="mx-2" variant="success" type="submit">
            اعمال فیلتر
          </Button>
          <Button className="mx-2" variant="secondary">
            لغو فیلتر
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FieldsTableCheckout;
