import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentComp,
  selectCurrentDep,
  selectDetailes,
  selectEditCheckoutModal,
  setEditCheckoutModal,
} from "../../checkoutOfficialSlice/TableCheckoutSlice";
import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";

const EditCheckoutModal = () => {
  const dispatch = useDispatch();
  const currentReqCo = useSelector(selectCurrentComp);
  const editCheckoutModal = useSelector(selectEditCheckoutModal);
  const currentReqDepartment = useSelector(selectCurrentDep);
  const details = useSelector(selectDetailes);
  const reasonChanger = details.leavingWorkCause;
  const desChanger = details.description;
  const [reasonLeavingTitle, setReasonLeavingTitle] = useState(reasonChanger);
  const [dateTitle, setDateTitle] = useState(null);
  const [descriptionTitle, setDescriptionTitle] = useState(desChanger);
  useEffect(() => {
    if (details.leavingWorkDate !== undefined) {
      setDateTitle(moment(details.leavingWorkDate, "YYYY/MM/DD"));
    }
    if (details.leavingWorkCause !== undefined) {
      setReasonLeavingTitle(details.leavingWorkCause);
    }
    if (details.description !== undefined) {
      setDescriptionTitle(details.description);
    }
  }, [details]);

  const editHandler = () => {
    alert("Accepted");
  };

  return (
    <Modal
      show={editCheckoutModal}
      onHide={() => dispatch(setEditCheckoutModal(false))}
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
            <input
              className="form-control"
              value={reasonLeavingTitle}
              onChange={(e) => setReasonLeavingTitle(e.target.value)}
            />
          </p>
          <p className=" mb-3">
            <span className="fw-bold">تاریخ ترک خدمت: </span>
            <DatePicker
              id="item6"
              className="form-control"
              persianDigits={true}
              value={dateTitle}
              // onChange={(e) => setDateTitle(e)}
              isGregorian={false}
              timePicker={false}
              inputFormat="YYYY-MM-DD"
              inputJalaaliFormat="jYYYY-jM-jD"
            />
          </p>
          <p className="font-weight-bold mb-3">
            <span className="fw-bold">توضیحات: </span>
            <textarea
              type="textArea"
              value={descriptionTitle}
              onChange={(e) => setDescriptionTitle(e.target.value)}
              className="form-control"
            />
          </p>
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
            onClick={() => dispatch(setEditCheckoutModal(false))}
          >
            بستن
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCheckoutModal;
