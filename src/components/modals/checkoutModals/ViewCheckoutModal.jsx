import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addComplateDescription,
  postViewBtn,
  selectComplateDescription,
  selectCurrentComp,
  selectCurrentDep,
  selectDetailes,
  selectViewCheckoutModal,
  setViewCheckoutModal,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";
import moment from "moment-jalaali";
import { toast } from "react-toastify";

const ViewCheckoutModal = () => {
  const dispatch = useDispatch();
  const viewCheckoutModal = useSelector(selectViewCheckoutModal);
  const currentReqCo = useSelector(selectCurrentComp);
  const currentReqDepartment = useSelector(selectCurrentDep);
  const details = useSelector(selectDetailes);
  const complateDescription = useSelector(selectComplateDescription);

  // const validation = () => {
  //   let error = "";
  //   if (!complateDescription) {
  //     return (error.complateDescription = "لطفا نظر مورد");
  //   }
  // };

  return (
    <Modal
      show={viewCheckoutModal}
      onHide={() => dispatch(setViewCheckoutModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="cont_modal"
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
        <Row>
          <Col xs={12} md={8} xl={12}>
            <p className="mb-3 me-1">
              <span className="fw-bold">نام و نام خانوادگی: </span>
              <span>
                {`${
                  details.leaver !== undefined ? details.leaver.first_name : ""
                } ${
                  details.leaver !== undefined ? details.leaver.last_name : ""
                }`}
              </span>
            </p>
          </Col>
          <p className="mb-3 me-1">
            <span className="fw-bold">شرکت: </span>
            <span>{currentReqCo}</span>
          </p>
          <Col xs={6} md={4}>
            <p className="mb-3 me-1">
              <span className="fw-bold">واحد سازمانی: </span>
              <span>{currentReqDepartment}</span>
            </p>
          </Col>
          <p className=" mb-3">
            <span className="fw-bold">علت ترک خدمت: </span>
            {details.leavingWorkCause !== undefined
              ? details.leavingWorkCause
              : ""}{" "}
          </p>
          <p className=" mb-3">
            <span className="fw-bold">تاریخ ترک خدمت: </span>
            {details.leavingWorkDate !== undefined
              ? moment(details.leavingWorkDate, "YYYY/MM/DD")
                  .locale("fa")
                  .format("jYYYY/jMM/jDD")
              : ""}
          </p>
          <p className="font-weight-bold mb-3">
            <span className="fw-bold">توضیحات: </span>
            {details.description !== undefined ? details.description : ""}
          </p>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="d-flex">
          <Col xl="12">
            <Form.Control
              type="text"
              name="description"
              value={complateDescription}
              onChange={(e) => dispatch(addComplateDescription(e.target.value))}
            />
          </Col>
          <Button
            onClick={() => {
              dispatch(postViewBtn());
              dispatch(setViewCheckoutModal(false));
            }}
            className="ms-2 col-5"
            variant="warning"
          >
            ارسال نظر
          </Button>
        </div>
        <div>
          <Button
            className="justify-content-end"
            variant="secondary"
            onClick={() => dispatch(setViewCheckoutModal(false))}
          >
            بستن
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewCheckoutModal;
