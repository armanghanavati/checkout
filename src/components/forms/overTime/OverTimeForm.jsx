import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button, Col, Row } from "react-bootstrap";
import { Formik, Form, Field, withFormik } from "formik";
import DatePicker from "react-datepicker2";
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
  selectShowOverTime,
  addShowOverTime,
  selectIsSubmit,
  setIsSubmit,
} from "../../slices/OverTimeSlice";
import { useDispatch, useSelector } from "react-redux";
import OverTimeTableList from "./table/OverTimeTableList";
import OverTime from "../../modals/overTime/OverTime";
import * as Yup from "yup";

const AllValidationForm = ({ values, errors, touched }) => {
  const dispatch = useDispatch();
  const overTimeReasons = useSelector(selectOverTimeReason);
  const des = useSelector(selectDescreption);
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);
  const overTimeReasonValue = useSelector(selectOverTimeReasonValue);
  const formErrors = useSelector(selectFormErrors);
  const isSubmit = useSelector(selectIsSubmit);

  // const applyHandler = () => {
  //   if (overTimeReasons && startDate && endDate) {
  //     dispatch(addShowOverTime(true));
  //     dispatch(addFormErrors(""));
  //     console.log(overTimeReasons);
  //     if (overTimeReasons.value == undefined) {
  //       dispatch(
  //         addFormErrors(
  //           validation({
  //             overTimeReasonValue: overTimeReasonValue.value,
  //             startDate: startDate,
  //             endDate: endDate,
  //           })
  //         )
  //       );
  //     }
  //   } else {
  //     dispatch(
  //       addFormErrors(
  //         validation({
  //           overTimeReasonValue: overTimeReasonValue.value,
  //           startDate: startDate,
  //           endDate: endDate,
  //         })
  //       )
  //     );
  //   }
  // };

  const clearHandler = () => {
    dispatch(setIsSubmit(false));
    dispatch(addOverTimeReasonValue(""));
    dispatch(addStartDate(null));
    dispatch(addEndDate(null));
    dispatch(addDescreption(""));
    dispatch(addFormErrors(""));
  };

  const sendToManager = () => {
    dispatch(postOverTimeApi());
    dispatch(addOverTimeReasonValue(""));
    dispatch(addStartDate(null));
    dispatch(addEndDate(null));
    dispatch(addDescreption(""));
    dispatch(addFormErrors(""));
  };

  const reasonHandler = (e) => {
    dispatch(addOverTimeReasonValue(e));
  };

  const startDateHandler = (e) => {
    dispatch(addStartDate(e));
  };

  const endDateHandler = (e) => {
    dispatch(addEndDate(e));
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
    <Form>
      <div className="form-group">
        {touched.overTimeReasonValue && errors.overTimeReasonValue && (
          <p> {errors.overTimeReasonValue}</p>
        )}
        <label className="required-field form-label">نوع اضافه کار:</label>
        <Field
          type="select"
          name="overReason"
          className={`"form-control"
                ${errors.firstName && touched.firstName ? " is-invalid" : ""}`}
        />
      </div>
      <div className="form-group">
        {touched.startDate && errors.startDate && <p> {errors.startDate}</p>}
        <label className="required-field mx-2 form-label">
          {" "}
          تاریخ و زمان شروع:{" "}
        </label>
        <Field
          name="StartD"
          type="text"
          className={`"form-control"
                ${errors.startDate && touched.startDate ? "is-invalid" : ""}`}
        />
      </div>
      <div className="form-group">
        {touched.endDate && errors.endDate && <p> {errors.endDate}</p>}
        <label className="required-field mx-2 form-label">
          {" "}
          تاریخ و زمان پایان:{" "}
        </label>
        <Field
          name="StartD"
          type="text"
          className={`"form-control"
                ${errors.endDate && touched.endDate ? "is-invalid" : ""}`}
        />
      </div>
    </Form>
  );
};

const OverTimeForm = withFormik({
  mapPropsToValues({ overTimeReasonValue, startDate, endDate }) {
    return {
      overTimeReasonValue: overTimeReasonValue.value || "",
      startDate: startDate || null,
      endDate: endDate || null,
    };
  },
  validationSchema: Yup.object().shape({
    overTimeReasonValue: Yup.string().required(
      "لطفا نوع اضافه کار را انتخاب نمایید"
    ),
    startDate: Yup.string().required("لطفا تاریخ و زمان شروع را مشخص نمایید!"),
    endDate: Yup.string().required("لطفا تاریخ و زمان پایان را مشخص نمایید!"),
  }),
  handlerSubmit(values) {
    console.log(values);
  },
})(AllValidationForm);

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

//   <div className="form-group">
//     <Row>
//       <Col className="mb-4" md="12" lg="6" xl="3">
//         <Select
//           value={overTimeReasonValue}
//           onChange={reasonHandler}
//           options={overTimeReasons}
//           placeholder="انتخاب"
//         />
//         <p className="font12 text-danger mb-0 mt-1">
//           {formErrors.overTimeReasonValue}
//         </p>
//       </Col>
//       <Col className="mb-4" md="12" lg="6" xl="3">
//         <label className="required-field mx-2 form-label">
//           تاریخ و زمان شروع:
//         </label>
//         <DatePicker
//           value={startDate}
//           onChange={startDateHandler}
//           type="date"
//           v-model="dateWhichShouldShow"
//           inputFormat="YYYY-MM-DD"
//           pick12HourFormat={false}
//           isGregorian={false}
//           timePicker={true}
//           className="form-control mb-xl-0"
//         />
//         <p className="font12 text-danger mt-1">{formErrors.startDate}</p>
//       </Col>
//       <Col className="mb-4" md="12" lg="6" xl="3">
//         <label className="col-6 required-field col-lg-6 mx-2 form-label">
//           تاریخ و زمان پایان:
//         </label>
//         <DatePicker
//           onChange={endDateHandler}
//           value={endDate}
//           type="date"
//           v-model="dateWhichShouldShow"
//           inputFormat="YYYY-MM-DD"
//           pick12HourFormat={false}
//           isGregorian={false}
//           timePicker={true}
//           className="form-control col-12 col-sm-12 col-md-12 col-md-4"
//         />
//         <p className="font12 text-danger mb-0 mt-1">{formErrors.endDate}</p>
//       </Col>
//       <Col className="mb-4" md="12" lg="6" xl="12">
//         <label className="mb-1 form-label"> توضیحات: </label>
//         <textarea
//           value={des}
//           onChange={(e) => dispatch(addDescreption(e.target.value))}
//           as="textarea"
//           rows={4}
//           className="form-control"
//         />
//       </Col>
//       <div className="justify-content-center text-center ">
//         <Button
//           onClick={clearHandler}
//           variant="secondary"
//           className="col-sm-12 col-md-3 col-xl-2 me-4 my-1"
//         >
//           ایجاد مورد جدید
//         </Button>
//         <Button
//           onClick={applyHandler}
//           variant="success"
//           className="col-sm-12 col-md-3 col-xl-1 text-center me-1 ms-xl-4 justify-content-center my-1"
//         >
//           ثبت
//         </Button>
//         <Button
//           disabled={isSubmit ? false : true}
//           onClick={sendToManager}
//           variant="primary"
//           className="col-sm-12 col-md-3 col-xl-2 ms-xl-2 my-1"
//         >
//           ارسال به سرپرست / مدیر
//         </Button>
//       </div>
//     </Row>
//   </div>
//   <OverTime />
//   <OverTimeTableList />
// </Formik>
