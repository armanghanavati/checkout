import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { selectAllDeps } from "../../slices/mainSlices";
import {
  RsetToDate,
  RsetFromDate,
  RsetUserListValue,
  handleUsersOverTime,
  selectDepartmant,
  selectEndDate,
  selectRequestMembs,
  selectStartDate,
  selectStatus,
  selectUserRequestFilter,
  RsetDepartemant,
  RsetStatus,
} from "../../slices/OverTimeSlice";
import { selectAllStatus } from "../../slices/TableCheckoutSlice";

const OverTimeFilter = () => {
  const [isChecked, setIsChecked] = useState(false);
  const allDeps = useSelector(selectAllDeps);
  const requestMembs = useSelector(selectRequestMembs);
  const allStatuses = useSelector(selectAllStatus);
  const fromDate = useSelector(selectStartDate);
  const toDate = useSelector(selectEndDate);
  const status = useSelector(selectStatus);
  const dep = useSelector(selectDepartmant);
  const reqLists = useSelector(selectUserRequestFilter);
  const dispatch = useDispatch();

  const cancelFilter = () => {
    dispatch(RsetFromDate(null));
    dispatch(RsetToDate(null));
    dispatch(RsetStatus(""));
    dispatch(RsetDepartemant(""));
    dispatch(RsetUserListValue(""));
  };

  const filterHandler = (e) => {
    e.preventDefault();
    console.log(e);
    dispatch(handleUsersOverTime());
  };

  return (
    <section>
      <Form>
        <Row>
          <Col lg="3">
            <Form.Label> درخواست کننده: </Form.Label>
            <Select
              className="mb-3"
              value={reqLists}
              onChange={(e) => {
                dispatch(RsetUserListValue(e));
                if (isChecked) {
                  dispatch(handleUsersOverTime());
                }
              }}
              options={requestMembs}
              placeholder="انتخاب"
            />
          </Col>
          <Col lg="3">
            <Form.Label> وضعیت درخواست: </Form.Label>
            <Select
              className="mb-3"
              value={status}
              onChange={(e) => {
                dispatch(RsetStatus(e));
                if (isChecked) {
                  dispatch(handleUsersOverTime());
                }
              }}
              options={allStatuses}
              placeholder="انتخاب"
            />
          </Col>
          <Col lg="3">
            <Form.Label> تاریخ شروع: </Form.Label>
            <DatePicker
              persianDigits={false}
              isGregorian={false}
              timePicker={false}
              value={fromDate}
              onChange={(e) => {
                dispatch(RsetFromDate(e));
                if (isChecked) {
                  dispatch(handleUsersOverTime());
                }
              }}
              className="form-control mb-3"
            />
          </Col>
          <Col lg="3">
            <Form.Label> تاریخ پایان: </Form.Label>
            <DatePicker
              value={toDate}
              onChange={(e) => {
                dispatch(RsetToDate(e));
                if (isChecked) {
                  dispatch(handleUsersOverTime());
                }
              }}
              persianDigits={false}
              isGregorian={false}
              timePicker={false}
              className="form-control mb-3"
            />
          </Col>
          <Col lg="3">
            <Form.Label> واحد: </Form.Label>
            <Select
              className="mb-3"
              value={dep}
              onChange={(e) => {
                dispatch(RsetDepartemant(e));
                if (isChecked) {
                  dispatch(handleUsersOverTime());
                }
              }}
              options={allDeps}
              placeholder="جستجو . . ."
            />
          </Col>
          <Col className="text-center" lg="4">
            <Form.Label className="justify-content-center mx-4 mb-3 d-flex">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mx-3"
              />
              جستجو لحظه ای
            </Form.Label>
            <Button onClick={filterHandler} className="me-1" variant="success">
              اعمال فیلتر
            </Button>
            <Button onClick={cancelFilter} variant="secondary">
              لغو فیلتر
            </Button>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default OverTimeFilter;
