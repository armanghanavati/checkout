import React, { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment-jalaali";
import {
  RsetAcceptOverTimeModal,
  selectAcceptOverTime,
  selectCurrentReqInfo,
} from "../../slices/OverTimeSlice";

const AcceptOverTime = () => {
  const dispatch = useDispatch();
  const AcceptCheckoutModal = useSelector(selectAcceptOverTime);
  const details = useSelector(selectCurrentReqInfo);

  const fromDate = moment(details.reqInfo.fromDate, "YYYY/MM/DD hh:mm A")
    .locale("fa")
    .format("jYYYY/jMM/jDD hh:mm A");

  const toDate = moment(details.reqInfo.toDate, "YYYY/MM/DD hh:mm A")
    .locale("fa")
    .format("jYYYY/jMM/jDD hh:mm A");

  // console.log(
  //   moment(details.reqInfo.fromDate, "YYYY/MM/DD hh:mm A")
  //     .locale("fa")
  //     .format("jYYYY/jMM/jDD hh:mm A")
  // );

  const postUsersHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      centered
      show={AcceptCheckoutModal}
      onHide={() => dispatch(RsetAcceptOverTimeModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="cont_modal"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className="d-block bg-success text-white">
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
            <span>تایید درخواست </span>
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
                {details.process !== undefined
                  ? `${details.process[0].userInfo.first_name} ${details.process[0].userInfo.last_name}`
                  : ""}
              </span>
            </p>
          </Col>
          <p className="mb-3 me-1">
            <span className="fw-bold">تاریخ و ساعت شروع: </span>
            <span>{details.reqInfo !== undefined ? fromDate : ""}</span>
          </p>
          <Col xs={6} md={4}>
            <p className="mb-3 me-1">
              <span className="fw-bold">تاریخ و ساعت پایان: </span>
              <span>{details.reqInfo !== undefined ? toDate : ""}</span>
            </p>
          </Col>
          <p className=" mb-3">
            <span className="fw-bold">نوع اضافه کار: </span>
            <span>
              {details.reqInfo !== undefined ? details.reqInfo.reason : ""}
            </span>
          </p>
          <p className="font-weight-bold mb-3">
            <span className="fw-bold">توضیحات: </span>
            <span>
              {/* {details.reqInfo !== undefined ? details.reqInfo.description : ""} */}
            </span>
          </p>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="d-flex">
          <Col xl="12">
            <Form.Control
              placeholder="توضیحات تکمیل کننده درخواست"
              type="text"
              name="description"
            />
          </Col>
          <Button
            onClick={postUsersHandler}
            className="col-5 ms-2"
            variant="success"
          >
            تایید درخواست
          </Button>
        </div>

        <Button
          className="justify-content-end"
          variant="secondary"
          onClick={() => dispatch(RsetAcceptOverTimeModal(false))}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcceptOverTime;
