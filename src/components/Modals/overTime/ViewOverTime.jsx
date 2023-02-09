import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-jalaali";
import {
  RsetViewOverTimeModal,
  selectViewOverTime,
} from "../../slices/OverTimeSlice";
import {
  handlePostComment,
  RsetDescriptionModals,
  selectDescriptionModals,
  selectCurrentReqInfo,
} from "../../slices/mainSlices";

const ViewOverTime = () => {
  const dispatch = useDispatch();

  const view = useSelector(selectViewOverTime);
  const details = useSelector(selectCurrentReqInfo);
  const des = useSelector(selectDescriptionModals);

  const fromDate = moment(details.reqInfo.fromDate, "YYYY/MM/DD hh:mm A")
    .locale("fa")
    .format("jYYYY/jMM/jDD hh:mm A");

  const toDate = moment(details.reqInfo.toDate, "YYYY/MM/DD hh:mm A")
    .locale("fa")
    .format("jYYYY/jMM/jDD hh:mm A");

  console.log(details);

  return (
    <Modal
      centered
      show={view}
      onHide={() => dispatch(RsetViewOverTimeModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="modal-90w"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className="d-block bg-warning text-white">
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
            <span>مشاهده درخواست </span>
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
            <span className="fw-bold"> نوع اضافه کار: </span>
            <span>
              {details.reqInfo !== undefined ? details.reqInfo.reason.label : ""}
            </span>
          </li>
          <li className="mb-3">
            <span className="fw-bold">تاریخ و ساعت شروع: </span>
            <span>{details.reqInfo !== undefined ? fromDate : ""}</span>
          </li>
          <li className="mb-3">
            <span className="fw-bold">تاریخ و ساعت پایان: </span>
            <span>{details.reqInfo !== undefined ? toDate : ""}</span>
          </li>
          <li className="mb-3">
            <span className="fw-bold">توضیحات: </span>
            <span>{details.reqInfo !== undefined ? details.reqInfo.description : ""}</span>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="d-flex">
          <Col xl="12">
            <Form.Control
              value={des}
              onChange={(e) => dispatch(RsetDescriptionModals(e.target.value))}
              type="text"
              name="description"
            />
          </Col>
          <Button
            onClick={() => {
              dispatch(handlePostComment(14));
              dispatch(RsetViewOverTimeModal(false));
            }}
            className="ms-2 col-5"
            variant="warning"
          >
            ارسال نظر
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              dispatch(RsetViewOverTimeModal(false));
              dispatch(RsetDescriptionModals(""));
            }}
            className="justify-content-end"
            variant="secondary"
          >
            بستن
          </Button>
        </div>
      </Modal.Footer>
    </Modal >
  );
};

export default ViewOverTime;
