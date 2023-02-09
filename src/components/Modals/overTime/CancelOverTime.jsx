import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addComplateDescription,
  selectCurrentComp,
  selectCurrentDep,
} from "../../slices/CheckoutOfficialSlice";
import moment from "moment-jalaali";
import {
  RsetCancelOverTimeModal,
  selectCancelOverTime,
  selectCurrentReqInfo,
} from "../../slices/OverTimeSlice";
import {
  handlePostCancelModal,
  selectDescriptionModals,
} from "../../slices/mainSlices";

const CancelOverTime = () => {
  const dispatch = useDispatch();
  const cancel = useSelector(selectCancelOverTime);
  const currentReqDepartment = useSelector(selectCurrentDep);
  const details = useSelector(selectCurrentReqInfo);
  const complateDescription = useSelector(selectDescriptionModals);

  const fromDate = moment(details.reqInfo.fromDate, "YYYY/MM/DD hh:mm A")
    .locale("fa")
    .format("jYYYY/jMM/jDD hh:mm A");

  const toDate = moment(details.reqInfo.toDate, "YYYY/MM/DD hh:mm A")
    .locale("fa")
    .format("jYYYY/jMM/jDD hh:mm A");

  console.log(details);

  const cancelHandler = () => {
    console.log("click");
    dispatch(handlePostCancelModal(14));
    dispatch(RsetCancelOverTimeModal(false));
  };

  return (
    <Modal
      centered
      show={cancel}
      onHide={() => dispatch(RsetCancelOverTimeModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className="d-block bg-danger text-white">
        <Modal.Title className="d-flex justify-content-between">
          <div>
            <span className="fw-bold me-2">شماره سریال: </span>
            <span>
              {" "}
              {details.reqInfo !== undefined
                ? details.reqInfo.serial_number
                : ""}
            </span>
          </div>
          <div>
            <span>ابطال درخواست </span>
          </div>
          <div>
            <span className="fw-bold me-2">تاریخ درخواست:</span>
            <span>
              {" "}
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
        <ul className="list-unstyled" >
          <li className="mb-3">
            <span className="fw-bold">نام و نام خانوادگی: </span>
            <span>
              {details.process !== undefined
                ? `${details.process[0].userInfo.first_name} ${details.process[0].userInfo.last_name}`
                : ""}
            </span>
          </li>
          <li className="mb-3">
            <span className="fw-bold">تاریخ و ساعت شروع: </span>
            <span>{details.reqInfo !== undefined ? fromDate : ""}</span>
          </li>
          <li className="mb-3">
            <span className="fw-bold">تاریخ و ساعت پایان: </span>
            <span> {details.reqInfo !== undefined ? toDate : ""} </span>
          </li>
          <li className=" mb-3">
            <span className="fw-bold">نوع اضافه کار: </span>
            <span>
              {details.reqInfo !== undefined ? details.reqInfo.reason.label : ""}
            </span>
          </li>
        </ul >
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="d-flex">
          <Col xl="12">
            <Form.Control
              placeholder="توضیحات تکمیل کننده درخواست"
              type="text"
              name="description"
              value={complateDescription}
              onChange={(e) => dispatch(addComplateDescription(e.target.value))}
            />
          </Col>
          <Button
            onClick={cancelHandler}
            className="ms-2 col-5"
            variant="danger"
          >
            ابطال درخواست
          </Button>
        </div>
        <div>
          <Button
            className="justify-content-end"
            variant="secondary"
            onClick={() => dispatch(RsetCancelOverTimeModal(false))}
          >
            بستن
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelOverTime;
