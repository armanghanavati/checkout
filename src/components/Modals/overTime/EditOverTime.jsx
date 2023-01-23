import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  handlePostComment,
  selectAllStatus,
  selectCurrentComp,
  selectCurrentDep,
  selectEditCheckoutModal,
  RsetEditCheckoutModal,
} from "../../slices/CheckoutOfficialSlice";

import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";
import Select from "react-select";
import {
  selectReasonLeaving,
  RsetReasonLeavingWork,
  selectReasonLeavingModal,
  selectReasonLeavingData,
  RsetReasonLeavingModal,
} from "../../slices/CheckoutOfficialSlice";
import {
  RsetEditOverTimeModal,
  selectEditOverTime,
  selectOverTimeReason,
} from "../../slices/OverTimeSlice";
import { selectCurrentReqInfo } from "../../slices/mainSlices";

const EditOverTime = () => {
  const dispatch = useDispatch();
  const currentReqCo = useSelector(selectCurrentComp);
  const currentReqDepartment = useSelector(selectCurrentDep);
  const editCheckoutModal = useSelector(selectEditOverTime);
  const reasonLeavingData = useSelector(selectReasonLeavingData);
  const details = useSelector(selectCurrentReqInfo);
  const allStatuses = useSelector(selectAllStatus);

  const overTimeReas = useSelector(selectOverTimeReason);

  const reasonChanger = details.reqInfo;
  let getReasonValue = [];

  // const test = reasonChanger.replice({
  //   name: label,
  //   code: value,
  // });

  // reasonChanger.map((reason) => {
  //   getReasonValue.push({
  //     label: reason.name,
  //     value: reason.code,
  //   });
  // });

  console.log(getReasonValue);
  console.log(reasonChanger);

  const statusObj = details.status;
  const desChanger = details.reqInfo;
  console.log(desChanger);
  const [FromDateTitle, setFromDateTitle] = useState(null);
  const [toDateTitle, setToDateTitle] = useState(null);
  const [descriptionTitle, setDescriptionTitle] = useState(desChanger);
  const [overTimeReason, setOverTimeReason] = useState(details.reqInfo);

  useEffect(() => {
    console.log(details);
    function onChangeHandlerInputs() {
      if (details.reqInfo !== undefined) {
        setFromDateTitle(
          moment(details.reqInfo.fromDate, "YYYY/MM/DD hh:mm A")
        );
      }
      if (details.reqInfo !== undefined) {
        setToDateTitle(moment(details.reqInfo.toDate, "YYYY/MM/DD hh:mm A"));
      }

      if (details.reqInfo !== undefined) {
        setOverTimeReason(details.reqInfo.reason);
      }

      if (details.reqInfo !== undefined) {
        setDescriptionTitle(details.reqInfo.description);
      }
      // if (details.process[0] !== undefined) {
      //   setDescriptionTitle(details.process[0]);
      // }
    }
    onChangeHandlerInputs();
  }, [details]);

  const editHandler = () => {
    console.log("accepted");
    // dispatch(handlePostComment());
    dispatch(RsetEditCheckoutModal(false));
  };

  return (
    <Modal
      centered
      show={editCheckoutModal}
      onHide={() => dispatch(RsetEditOverTimeModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="cont_modal"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className="d-block bg-primary text-white">
        <Modal.Title className="d-flex justify-content-between">
          <div>
            <span className="fw-bold me-2">شماره سریال: </span>
            <span>
              {details.reqInfo !== undefined
                ? details.reqInfo.serial_number
                : ""}
            </span>
          </div>
          <div>
            <span>ویرایش درخواست </span>
          </div>
          <div>
            <span className="fw-bold me-2">تاریخ درخواست:</span>
            <span>
              {details.process !== undefined
                ? moment(details.process[0].date, "YYYY/MM/DD")
                    .locale("fa")
                    .format("jYYYY/jMM/jDD")
                : ""}
            </span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Row>
          <Col xs={12} md={8} xl={12}>
            <p className="mb-3 me-1">
              <span className="fw-bold">نام و نام خانوادگی: </span>
              <span>
                {`${
                  details.process !== undefined
                    ? details.process[0].userInfo.first_name
                    : ""
                } ${
                  details.process !== undefined
                    ? details.process[0].userInfo.last_name
                    : ""
                }`}
              </span>
            </p>
          </Col>
          <div className=" mb-3">
            <span className="fw-bold">نوع اضافه کار: </span>
            <Select
              className="mb-3 mt-1 "
              placeholder="انتخاب"
              options={overTimeReas}
              // defaultValue={testJSon}
              onChange={(e) => setOverTimeReason(e)}
            />
          </div>

          <div>
            <p className="font-weight-bold mb-3">
              <span className="fw-bold">توضیحات: </span>
              <textarea
                type="textArea"
                value={descriptionTitle}
                onChange={(e) => setDescriptionTitle(e.target.value)}
                className="form-control mt-1 "
              />
            </p>
          </div>
          <Col xs={6} md={4}>
            <p className="mb-3 me-1">
              <span className="fw-bold ">تاریخ و ساعت شروع: </span>
              <DatePicker
                className="form-control mt-1"
                type="date"
                v-model="dateWhichShouldShow"
                inputFormat="YYYY-MM-DD"
                pick12HourFormat={false}
                isGregorian={false}
                timePicker={true}
                value={FromDateTitle}
              />
            </p>
          </Col>
          <Col xs={6} md={4}>
            <div>
              <p className="mb-3 me-1">
                <span className="fw-bold ">تاریخ و ساعت پایان: </span>
                <DatePicker
                  value={toDateTitle}
                  className="form-control mt-1"
                  type="date"
                  v-model="dateWhichShouldShow"
                  inputFormat="YYYY-MM-DD"
                  pick12HourFormat={false}
                  isGregorian={false}
                  timePicker={true}
                />
              </p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="d-flex">
          <Button onClick={editHandler} className=" " variant="primary">
            ویرایش درخواست
          </Button>
        </div>
        <div>
          <Button
            className="justify-content-end"
            variant="secondary"
            onClick={() => {
              dispatch(RsetEditOverTimeModal(false));
            }}
          >
            بستن
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOverTime;
