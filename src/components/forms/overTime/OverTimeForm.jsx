import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import { DateTimeInput } from "react-hichestan-datetimepicker";
import {
  addStartDate,
  addEndDate,
  addDescreption,
  selectDescreption,
  selectStartDate,
  selectOverTimeReason,
  selectOverTimeReasonValue,
  addOverTimeReasonValue,
  selectEndDate,
  postOverTimeApi,
  selectFormErrors,
  addFormErrors,
} from "../../slices/OverTimeSlice";
import { useDispatch, useSelector } from "react-redux";

const OverTimeForm = () => {
  const dispatch = useDispatch();
  const overTimeReasons = useSelector(selectOverTimeReason);
  const des = useSelector(selectDescreption);
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);
  const overTimeReasonValue = useSelector(selectOverTimeReasonValue);
  const formErrors = useSelector(selectFormErrors);
  const [isSubmit, setIsSubmit] = useState(false);

  const applyHandler = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (overTimeReasons && startDate && endDate) {
      dispatch(postOverTimeApi());
      dispatch(addFormErrors(""));
      console.log(overTimeReasons.value);
      if (overTimeReasons.value == undefined) {
        dispatch(
          addFormErrors(
            validation({
              overTimeReasonValue: overTimeReasonValue.value,
              startDate: startDate,
              endDate: endDate,
            })
          )
        );
      }
    } else {
      dispatch(
        addFormErrors(
          validation({
            overTimeReasonValue: overTimeReasonValue.value,
            startDate: startDate,
            endDate: endDate,
          })
        )
      );
    }
  };

  const clearHandler = () => {
    dispatch(addOverTimeReasonValue(""));
    dispatch(addStartDate(null));
    dispatch(addEndDate(null));
    dispatch(addDescreption(""));
    dispatch(addFormErrors(""));
  };

  const validation = ({ overTimeReasonValue, startDate, endDate }) => {
    const errors = {};
    if (!overTimeReasonValue) {
      errors.overTimeReasonValue = "لطفا نوع اضافه کار را انتخاب نمایید!";
    }
    if (!startDate) {
      errors.startDate = "لطفا تاریخ و زمان شروع را مشخص نمایید!";
    }
    if (!endDate) {
      errors.endDate = "لطفا تاریخ و زمان پایان را مشخص نمایید!";
    }
    return errors;
  };

  useEffect(() => {
    function paternHandler() {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        return overTimeReasonValue && startDate && endDate;
      }
    }
    paternHandler();
  }, [formErrors]);

  return (
    <>
      <Form className="form-group">
        <Row>
          <Col className="mb-4" md="12" lg="6" xl="3">
            <Form.Label className="required-field form-label">
              نوع اضافه کار:
            </Form.Label>
            <Select
              value={overTimeReasonValue}
              onChange={(e) => dispatch(addOverTimeReasonValue(e))}
              options={overTimeReasons}
              placeholder="جستجو . . ."
            />
            <p className="font12 text-danger mb-0 mt-1">
              {formErrors.overTimeReasonValue}
            </p>
          </Col>
          <Col className="mb-4" md="12" lg="6" xl="3">
            <Form.Label className="required-field mx-2 form-label">
              تاریخ و زمان شروع:
            </Form.Label>
            <DatePicker
              value={startDate}
              onChange={(e) => dispatch(addStartDate(e))}
              type="date"
              v-model="dateWhichShouldShow"
              inputFormat="YYYY-MM-DD"
              pick12HourFormat={false}
              isGregorian={false}
              timePicker={true}
              className="form-control mb-xl-0"
            />
            <p className="font12 text-danger mt-1">{formErrors.startDate}</p>
          </Col>
          <Col className="mb-4" md="12" lg="6" xl="3">
            <Form.Label className="col-6 required-field col-lg-6 mx-2 form-label">
              تاریخ و زمان پایان:
            </Form.Label>
            <DatePicker
              onChange={(e) => dispatch(addEndDate(e))}
              value={endDate}
              type="date"
              v-model="dateWhichShouldShow"
              inputFormat="YYYY-MM-DD"
              pick12HourFormat={false}
              isGregorian={false}
              timePicker={true}
              className="form-control col-12 col-sm-12 col-md-12 col-md-4"
            />
            <p className="font12 text-danger mb-0 mt-1">{formErrors.endDate}</p>
          </Col>
          <Col className="mb-4" md="12" lg="6" xl="12">
            <Form.Label className="mb-1 form-label"> توضیحات: </Form.Label>
            <Form.Control
              value={des}
              onChange={(e) => dispatch(addDescreption(e.target.value))}
              as="textarea"
              rows={4}
            />
          </Col>
          <div className="justify-content-center text-center ">
            <Button
              onClick={clearHandler}
              variant="secondary"
              className="col-sm-12 col-md-3 col-xl-2 me-4 my-1"
            >
              ایجاد مورد جدید
            </Button>
            <Button
              onClick={applyHandler}
              variant="success"
              className="col-sm-12 col-md-3 col-xl-1 text-center me-1 ms-xl-4 justify-content-center my-1"
            >
              ثبت
            </Button>
            <Button
              variant="primary"
              className="col-sm-12 col-md-3 col-xl-2 ms-xl-2 my-1"
            >
              ارسال به سرپرست / مدیر
            </Button>
          </div>
        </Row>
      </Form>
    </>
  );
};

export default OverTimeForm;

{
  /* <Form.Label className="col-2 mx-2 form-label">
  تاریخ تست:
  <DateTimeInput
    onChange={(e) => setStartDate(e.target.value)}
    value={startDate}
    className="form-control "
  />
</Form.Label> */
}
