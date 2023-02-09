import React, { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAcceptCheckoutModal,
  RsetAcceptCheckoutModal,
  selectCurrentComp,
  selectCurrentDep,
} from "../../slices/CheckoutOfficialSlice";
import moment from "moment-jalaali";
import {
  handlePostAccept,
  RsetDescriptionModals,
  selectCurrentReqInfo,
  selectDescriptionModals,
} from "../../slices/mainSlices";

const AcceptCheckoutModal = () => {
  const dispatch = useDispatch();

  const AcceptCheckoutModal = useSelector(selectAcceptCheckoutModal);
  const details = useSelector(selectCurrentReqInfo);
  const currentReqCo = useSelector(selectCurrentComp);
  const currentReqDepartment = useSelector(selectCurrentDep);
  const complateDescription = useSelector(selectDescriptionModals);
  const curReqIfo = useSelector(selectCurrentReqInfo);

  console.log(curReqIfo);

  return (
    <Modal
      centered
      show={AcceptCheckoutModal}
      onHide={() => dispatch(RsetAcceptCheckoutModal(false))}
      backdrop="static"
      role="dialog"
      dialogClassName="modal-90w"
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
        <ul className="list-unstyled" >
          <li className="mb-3">
            <span className="fw-bold">نام و نام خانوادگی: </span>
            <span>
              {`${details.leaver !== undefined ? details.leaver.first_name : ""
                } ${details.leaver !== undefined ? details.leaver.last_name : ""
                }`}
            </span>
          </li>
          <li className="mb-3 ">
            <span className="fw-bold">شرکت: </span>
            <span>{currentReqCo}</span>
          </li>
          <li className="mb-3 ">
            <span className="fw-bold">واحد سازمانی: </span>
            <span>{currentReqDepartment}</span>
          </li>
          <li className=" mb-3">
            <span className="fw-bold">علت ترک خدمت: </span>
            {details.leavingWorkCause.label !== undefined
              ? details.leavingWorkCause.label
              : ""}{" "}
          </li>
          <li className=" mb-3">
            <span className="fw-bold">تاریخ ترک خدمت: </span>
            {details.leavingWorkDate !== undefined
              ? moment(details.leavingWorkDate, "YYYY/MM/DD")
                .locale("fa")
                .format("jYYYY/jMM/jDD")
              : ""}
          </li>
          <li className=" mb-3">
            <span className="fw-bold">توضیحات: </span>
            {details.description !== undefined ? details.description : ""}
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="d-flex">
          <Col xl="12">
            <Form.Control
              placeholder="توضیحات تکمیل کننده درخواست"
              type="text"
              name="description"
              value={complateDescription}
              onChange={(e) => dispatch(RsetDescriptionModals(e.target.value))}
            />
          </Col>
          <Button
            onClick={(e) => {
              e.preventDefault();
              dispatch(handlePostAccept(10));
              dispatch(RsetAcceptCheckoutModal(false));
            }}
            className="col-5 ms-2"
            variant="success"
          >
            تایید درخواست
          </Button>
        </div>

        <Button
          className="justify-content-end"
          variant="secondary"
          onClick={() => dispatch(RsetAcceptCheckoutModal(false))}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcceptCheckoutModal;
