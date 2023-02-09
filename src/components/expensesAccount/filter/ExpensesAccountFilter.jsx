import React, { Fragment } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { RsetRealFilter, selectRealFilter } from "../../slices/mainSlices";

const ExpensesAccountFilter = () => {
  const dispatch = useDispatch()
  const realFilter = useSelector(selectRealFilter)

  return (
    <Fragment>
      <Form>
        <Row>
          <Col xl="3">
            <label className="mb-1  mt-4">درخواست کننده:</label>
            <Select placeholder="انتخاب" />
          </Col>
          <Col xl="3">
            <label className="mb-1 mt-4">وضعیت درخواست:</label>
            <Select placeholder="انتخاب" />
          </Col>
          <Col xl="3">
            <label className="mb-1 mt-4">تاریخ درخواست:</label>
            <DatePicker className="form-control" />
          </Col>
          <Col className="mt-4 justify-content-center">
            <Form.Group className="d-flex align-items-center mb-3 justify-content-end">
              <input className="" type='checkbox' name='realFilter'
                value={realFilter}
                checked={realFilter}
                onChange={() => { dispatch(RsetRealFilter(!realFilter)) }} />
              <Form.Label className='ms-2 font12 mb-0'> جستجو لحظه ای </Form.Label>
            </Form.Group>
            <div className=" d-flex justify-content-end">
              <Button className="me-2 mt-2 font12 " variant="success">
                اعمال فیلتر
              </Button>
              <Button className="font12  mt-2" variant="secondary">
                لغو فیلتر
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default ExpensesAccountFilter;
