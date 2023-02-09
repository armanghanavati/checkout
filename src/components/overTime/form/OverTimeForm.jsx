import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import {
  RsetFromDate,
  RsetToDate,
  RsetDescriptions,
  selectDescription,
  selectStartDate,
  selectOverTimeReason,
  selectOverTimeReasonValue,
  RsetOverTimeReasonValue,
  selectEndDate,
  selectFormErrors,
  RsetFormErrors,
  RsetDisable,
  RsetShowOverTimeApplyModal,
  RsetShowSendManagerModal,
  handleApplyUserOverTime,
  selectShowFields,
  handleResetOverTimeFilter,
  handleResetOverTimeForm,
} from "../../slices/OverTimeSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage } from "../../../utils/message";
import SendForm from "../../Modals/overTime/SendForm";
import SendFormManager from "../../Modals/overTime/SendFormManager";

const OverTimeForm = () => {
  const dispatch = useDispatch();
  const overTimeReasons = useSelector(selectOverTimeReason);
  const des = useSelector(selectDescription);
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);
  const overTimeReasonValue = useSelector(selectOverTimeReasonValue);
  const formErrors = useSelector(selectFormErrors);
  const showFields = useSelector(selectShowFields);

  const applyHandler = (e) => {
    e.preventDefault();
    if (overTimeReasonValue.value && startDate && endDate) {
      if (overTimeReasonValue.value == undefined) {
        dispatch(
          RsetFormErrors(
            validation({
              overTimeReasonValue: overTimeReasonValue,
              startDate: startDate,
              endDate: endDate,
            })
          )
        );
      } else if (startDate > endDate) {
        errorMessage("تاریخ شروع باید پیش از تاریخ پایان باشد!");
      } else {
        dispatch(RsetShowOverTimeApplyModal(true));
        dispatch(handleApplyUserOverTime());
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            overTimeReasonValue: overTimeReasonValue,
            startDate: startDate,
            endDate: endDate,
          })
        )
      );
    }
  };

  const clearHandler = () => {
    dispatch(handleResetOverTimeForm())
  };

  const validation = ({ overTimeReasonValue, startDate, endDate }) => {
    const errors = {};
    if (!overTimeReasonValue.value) {
      errors.overTimeReasonValue = "لطفا نوع اضافه کار را انتخاب نمایید!";
    }

    if (!startDate) {
      errors.startDate = "لطفا تاریخ و زمان شروع را مشخص نمایید!";
    } else if (startDate > endDate) {
      errors.startDate = "تاریخ شروع باید از تاریخ پایان عقب تر باشد!";
    }

    if (!endDate) {
      errors.endDate = "لطفا تاریخ و زمان پایان را مشخص نمایید!";
    } else if (startDate < endDate) {
      errors.endDate = "تاریخ پایان باید از تاریخ شروع جلو تر باشد!";
    }
    return errors;
  };
  const sendForManager = () => {
    dispatch(RsetShowSendManagerModal(true));
  };

  return (
    <>
      <Form className="form-group">
        <Row>
          <Col className="mb-4" md="12" lg="6" xl="3">
            <Form.Label className="required-field form-label">
              نوع اضافه کار:{" "}
            </Form.Label>
            <Select
              value={overTimeReasonValue}
              // onBlur={dispatch(handleUsersOvertime())}
              onChange={(e) => dispatch(RsetOverTimeReasonValue(e))}
              options={overTimeReasons}
              placeholder="انتخاب"
              className={`${formErrors.overTimeReasonValue && !overTimeReasonValue.value
                ? "rounded col-12 col-sm-12 col-md-12 col-md-4 border border-danger"
                : "rounded col-12 col-sm-12 col-md-12 col-md-4"
                } `}
            />
            {!overTimeReasonValue.value && (
              <p className="font12 text-danger mb-0 mt-1">
                {formErrors.overTimeReasonValue}
              </p>
            )}
          </Col>
          <Col className="mb-4" md="12" lg="6" xl="3">
            <Form.Label className="required-field mx-2 form-label">
              تاریخ و زمان شروع: {" "}
            </Form.Label>
            <DatePicker
              // onBlur={dispatch(handleUsersOvertime())}
              value={startDate}
              onChange={(e) => dispatch(RsetFromDate(e))}
              type="date"
              v-model="dateWhichShouldShow"
              inputFormat="YYYY-MM-DD"
              pick12HourFormat={false}
              isGregorian={false}
              timePicker={true}
              className={`${formErrors.startDate && !startDate
                ? "form-control col-12 col-sm-12 col-md-12 col-md-4 border border-danger"
                : "form-control col-12 col-sm-12 col-md-12 col-md-4"
                } `}
            />
            {!startDate && (
              <p className="font12 text-danger mt-1">{formErrors.startDate}</p>
            )}
          </Col>
          <Col className="mb-4" md="12" lg="6" xl="3">
            <Form.Label className="col-6 required-field col-lg-6 mx-2 form-label">
              تاریخ و زمان پایان:{" "}
            </Form.Label>
            <DatePicker
              onChange={(e) => dispatch(RsetToDate(e))}
              value={endDate}
              type="date"
              inputFormat="YYYY-MM-DD"
              pick12HourFormat={false}
              isGregorian={false}
              timePicker={true}
              className={`${formErrors.endDate && !endDate
                ? "form-control col-12 col-sm-12 col-md-12 col-md-4 border border-danger"
                : "form-control col-12 col-sm-12 col-md-12 col-md-4"
                } `}
            />
            {!endDate && (
              <p className="font12 text-danger mb-0 mt-1">
                {formErrors.endDate}
              </p>
            )}
          </Col>
          <Col className="mb-4" md="12" lg="6" xl="12">
            <Form.Label className="mb-1 form-label"> توضیحات: </Form.Label>
            <Form.Control
              value={des}
              onChange={(e) => dispatch(RsetDescriptions(e.target.value))}
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
              disabled={showFields ? true : false}
              variant="success"
              className="col-sm-12 col-md-3 col-xl-1 text-center me-1 ms-xl-4 justify-content-center my-1"
            >
              ثبت
            </Button>
            <Button
              onClick={sendForManager}
              variant="primary"
              disabled={showFields ? false : true}
              className="col-sm-12 col-md-3 col-xl-2 ms-xl-2 my-1"
            >
              ارسال به سرپرست / مدیر
            </Button>
          </div>
        </Row>
      </Form>
      <SendFormManager />
      <SendForm />
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
